export default function RecipeSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full h-24 border-b border-gray-200 px-5 flex justify-between items-center relative">
        <div className="h-10 w-1/3 rounded bg-gray-200" />
        <div className="absolute top-0 right-0 flex border-l border-gray-200 border-b border-b-gray-200 bg-gray-200 gap-px">
          <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
          </div>
          <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
            <div className="w-3 h-3 rounded bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="w-full flex h-100 border-b border-gray-200">
        <div className="w-1/2 h-full border-r border-gray-200 p-4">
          <div className="w-full h-full rounded bg-gray-200" />
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
          <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
          <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-10 rounded bg-gray-200" />
          </div>
          <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
          <div className="w-full grow px-5 py-4 space-y-3">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/2 border-r border-gray-200">
          <div className="w-full h-14 border-b border-gray-200 px-5 flex items-center">
            <div className="h-7 w-36 rounded bg-gray-200" />
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full py-2.5 px-5 flex justify-start items-center gap-3 border-b border-gray-200"
            >
              <div className="w-3 h-3 rounded-full bg-gray-300 shrink-0" />
              <div
                className={`h-4 rounded bg-gray-200 ${
                  index % 3 === 0 ? "w-2/3" : "w-3/4"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <div className="w-full h-14 border-b border-gray-200 px-5 flex items-center">
            <div className="h-7 w-40 rounded bg-gray-200" />
          </div>
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="w-full px-5 py-2.5 border-b border-gray-200 flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-gray-300 shrink-0" />
              <div className="flex-1 space-y-2">
                <div
                  className={`h-4 rounded bg-gray-200 ${
                    index % 3 === 0 ? "w-4/5" : "w-3/4"
                  }`}
                />
                {index % 2 === 0 && (
                  <div className="h-4 w-full rounded bg-gray-200" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
