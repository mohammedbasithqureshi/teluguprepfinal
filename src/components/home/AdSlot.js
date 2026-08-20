export default function AdSlot({ label = 'Advertisement' }) {
  return (
    <div className="container-page">
      <div className="border border-dashed border-gray-300 rounded-lg py-8 text-center text-xs text-gray-400 my-6">
        AD SPACE — {label}
        {/* Replace with real AdSense <ins> tag once approved */}
      </div>
    </div>
  );
}