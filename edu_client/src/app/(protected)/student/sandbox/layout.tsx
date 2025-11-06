
export default function AssessmentLayout({ question, children }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left: Question Panel */}
      <div className="lg:w-1/2 w-full overflow-auto p-6 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Problem Statement
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          {question}
        </div>
      </div>

      {/* Right: Editor / Interactive Environment */}
      <div className="lg:w-6/7 w-full h-full bg-gray-50 dark:bg-gray-850 p-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
