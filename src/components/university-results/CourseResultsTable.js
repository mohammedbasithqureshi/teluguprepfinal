'use client';
import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function CourseResultsTable({ courses }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!courses?.length) return null;

  return (
    <div className="mb-8 border-[3px] border-[#123C69] rounded-lg overflow-hidden">
      <div className="bg-[#123C69] px-4 py-3">
        <h2 className="text-lg font-bold text-white">Course-wise Results</h2>
      </div>
      <div className="divide-y divide-gray-200 bg-white">
        {courses.map((course, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-sm text-[#123C69]">
                  {course.course_name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 ml-3 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  {course.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#EAF8F6] hover:bg-[#00897B] hover:text-white text-[#00897B] text-xs font-bold px-3 py-2 rounded-lg transition"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}