import Link from 'next/link';

export default function Hero() {
  return (
    <>
      <section className="bg-gradient-to-r from-[var(--color-red)] to-[var(--color-red-dark)] text-white text-center py-10 md:py-14">
        <div className="container-page">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            TELUGU PREP<sup className="text-lg align-super">™</sup>
          </h1>
          <p className="text-lg md:text-xl font-semibold mt-2 opacity-90">TeluguPrep.in</p>
        </div>
      </section>

      <section className="bg-[var(--color-navy)] text-white text-center py-8">
        <div className="container-page">
          <p className="text-sm md:text-base font-medium leading-relaxed">
            TeluguPrep — Get Government Job Notifications, Results, Admit Card, Answer Key,
            Syllabus, Study Material for Telangana & Andhra Pradesh.
          </p>
          <div className="inline-flex items-center gap-2 border border-white/40 rounded-full px-4 py-1 text-xs font-bold mt-4">
            <span className="w-2 h-2 rounded-full bg-[var(--color-live-green)] animate-pulse" />
            LIVE
          </div>
        </div>
      </section>
    </>
  );
}