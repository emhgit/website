import Link from "next/link";

const sections = [
  {
    id: "democracy",
    title: "Democracy",
    description:
      "Exploring the foundations and limitations of American democratic principles",
  },
  {
    id: "equal-protection",
    title: "Equal Protection and Due Process",
    description:
      "Examining constitutional guarantees and their historical application",
  },
  {
    id: "freedom-of-expression",
    title: "Freedom of Expression",
    description:
      "Analyzing First Amendment rights and their evolution over time",
  },
  {
    id: "privacy",
    title: "Privacy",
    description:
      "Investigating the development of privacy rights in American law",
  },
  {
    id: "conclusion",
    title: "Conclusion",
    description:
      "Summarizing the key findings and implications of the American identity study",
  },
  {
    id: "bibliography",
    title: "Bibliography",
    description:
      "A collection of primary, secondary, and legal sources related to American identity",
  },
];

export default function AmericanIdentityGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      {sections.map((section) => (
        <Link
          key={section.id}
          href={`/american-identity/${section.id}`}
          className="group block p-6 border-2 border-red-800 rounded-lg transition-all duration-300 hover:bg-red-800 hover:text-off-white"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-red-800 group-hover:text-off-white">
              {section.title}
            </h3>
            <p className="text-gray-600 group-hover:text-off-white/90 text-sm leading-relaxed">
              {section.description}
            </p>
            <div className="flex items-center text-blue-900 group-hover:text-blue-900 font-medium text-sm">
              <span>Read more</span>
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
