export default function HowToCheckBox({ steps }) {
  return (
    <div className="mt-8 border-[2px] border-[#00897B] rounded-lg overflow-hidden">
      <div className="bg-[#EAF8F6] px-4 py-2.5">
        <h3 className="font-bold text-sm text-[#00897B]">How to Check Your Result</h3>
      </div>
      <ol className="p-4 space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="text-sm text-gray-700 flex gap-3">
            <span className="font-bold text-[#00897B] shrink-0">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}