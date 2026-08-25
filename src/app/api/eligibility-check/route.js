import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import eligibilityRules from '@/data/eligibilityRules.json';

export async function POST(request) {
  const { region, qualification, engineeringBranch, age, casteId } = await request.json();

  if (!region || !qualification) {
    return NextResponse.json({ error: 'Region and qualification required' }, { status: 400 });
  }

  const regionPrefix = { telangana: 'tg-', 'andhra-pradesh': 'ap-', central: 'c-' }[region];
  const acceptedQualifications = eligibilityRules.qualificationEligibility[qualification] || [qualification];
  const caste = eligibilityRules.casteCategories.find((c) => c.id === casteId);
  const ageRelaxation = caste?.ageRelaxation || 0;
  const candidateAge = age ? parseInt(age) : null;

  // Fetch all open jobs (region-relevant categories OR central, since central applies everywhere)
  const { data: allJobs, error } = await supabase
    .from('posts')
    .select('id, title, slug, category, state, vacancies, application_end, min_qualification, eligible_branches, min_age, max_age, official_link')
    .eq('type', 'job')
    .in('status', ['open', 'upcoming', 'closing_soon']);

  if (error) {
    console.error('Eligibility check error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const regionFiltered = allJobs.filter(
    (job) => job.category?.startsWith(regionPrefix) || job.category?.startsWith('c-')
  );

  const results = regionFiltered.map((job) => {
    let status = 'possibly_eligible';
    const reasons = [];

    // Qualification check
    if (job.min_qualification) {
      if (acceptedQualifications.includes(job.min_qualification)) {
        status = 'eligible';
      } else {
        status = 'not_eligible';
        reasons.push('Qualification does not meet the minimum requirement');
      }
    } else {
      reasons.push('Qualification requirement not specified — verify manually');
    }

    // Branch check (only relevant for btech qualification)
    if (
      status !== 'not_eligible' &&
      qualification === 'btech' &&
      job.eligible_branches?.length &&
      engineeringBranch &&
      !job.eligible_branches.includes(engineeringBranch)
    ) {
      status = 'possibly_eligible';
      reasons.push('Branch-specific eligibility not confirmed — check notification');
    }

    // Age check (with relaxation applied)
    if (status !== 'not_eligible' && candidateAge !== null && job.max_age) {
      const effectiveMaxAge = job.max_age + ageRelaxation;
      if (job.min_age && candidateAge < job.min_age) {
        status = 'not_eligible';
        reasons.push(`Below minimum age of ${job.min_age}`);
      } else if (candidateAge > effectiveMaxAge) {
        status = 'not_eligible';
        reasons.push(`Above maximum age (${job.max_age} + ${ageRelaxation} relaxation = ${effectiveMaxAge})`);
      }
    } else if (status !== 'not_eligible' && !job.max_age) {
      if (status === 'eligible') status = 'possibly_eligible';
      reasons.push('Age limit not specified — verify manually');
    }

    return { ...job, eligibilityStatus: status, reasons };
  });

  const eligible = results.filter((r) => r.eligibilityStatus === 'eligible');
  const possiblyEligible = results.filter((r) => r.eligibilityStatus === 'possibly_eligible');
  const notEligible = results.filter((r) => r.eligibilityStatus === 'not_eligible');

  return NextResponse.json({
    eligible,
    possiblyEligible,
    notEligibleCount: notEligible.length,
    casteNote: caste?.note || null,
  });
}