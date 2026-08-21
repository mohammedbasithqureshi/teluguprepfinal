export const metadata = { title: 'About Us | Telugu Prep' };

export default function AboutPage() {
  return (
    <article className="container-page py-10 max-w-3xl prose-content">
      <h1 className="text-3xl font-bold mb-6">About Telugu Prep</h1>

      <p className="mb-4">TeluguPrep.in was created to help job seekers across Telangana and Andhra Pradesh stay informed about government job opportunities, exam results, admit cards, and answer keys — all in one place.</p>

      <p className="mb-4">We understand that navigating dozens of official department websites to track notifications can be time-consuming and confusing. Our goal is to simplify that process by compiling verified information from official sources into a clean, easy-to-read format.</p>

      <h2 className="text-xl font-bold mt-8 mb-3">What We Offer</h2>
      <p className="mb-4">Daily updates on government job notifications across TSPSC, APPSC, Railways, Banking, Police, DSC/Teacher recruitment, and SSC exams. We also publish exam results, admit card release updates, answer keys, and free study material including syllabus guides, current affairs summaries, and preparation strategies.</p>

      <h2 className="text-xl font-bold mt-8 mb-3">Our Commitment</h2>
      <p className="mb-4">We are committed to accuracy and transparency. All information published is sourced from official government notifications, and we always recommend cross-verifying details on the respective official website before applying.</p>

      <h2 className="text-xl font-bold mt-8 mb-3">Independent Platform</h2>
      <p>TeluguPrep.in is an independent, privately-run informational platform and is not affiliated with any government body or recruitment board.</p>
    </article>
  );
}