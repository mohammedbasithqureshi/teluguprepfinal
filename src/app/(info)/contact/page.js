export const metadata = { title: 'Contact Us | Telugu Prep' };

export default function ContactPage() {
  return (
    <article className="container-page py-10 max-w-3xl prose-content">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-6">Have a question, correction, or suggestion? We'd love to hear from you.</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-lg mb-2">Email</h2>
        <a href="mailto:support@teluguprep.in" className="text-[var(--color-teal)] underline">
          screnestylist@gmail.com
        </a>
      </div>

      <p className="text-sm text-gray-500">
        We aim to respond to all inquiries within 2-3 business days. For corrections to job notifications, results, or exam dates, please include the relevant page URL in your message.
      </p>
    </article>
  );
}