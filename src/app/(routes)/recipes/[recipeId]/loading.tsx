export default function RecipePage() {
  return (
    <div>
      <div className="w-full h-24 flex justify-start items-center px-5 border-b border-b-gray-200">
        <div className="w-100 h-3/4 bg-gray-200 animate-pulse" />
      </div>
      <div className="w-full h-100 border-b border-b-gray-200 flex">
        <div className="w-1/2 h-full border-r border-r-gray-200">
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <div className="w-full h-[calc(100%/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
            <div className="w-25 h-5 bg-gray-200 animate-pulse" />
            <div className="w-25 h-5 bg-gray-200 animate-pulse" />
          </div>
          <div className="w-full h-[calc(100%/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
            <div className="w-25 h-5 bg-gray-200 animate-pulse" />
            <div className="w-25 h-5 bg-gray-200 animate-pulse" />
          </div>
          <div className="w-full h-[calc(100%/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
            <div className="w-25 h-5 bg-gray-200 animate-pulse" />
            <div className="w-25 h-5 bg-gray-200 animate-pulse" />
          </div>
          <div className="w-full h-[calc(100%/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
            <div className="w-25 h-5 bg-gray-200 animate-pulse" />
            <div className="w-25 h-5 bg-gray-200 animate-pulse" />
          </div>
          <div className="w-full px-5 py-2.5 flex flex-col justify-start items-start gap-3">
            <div className="w-full h-3 bg-gray-200 animate-pulse" />
            <div className="w-full h-3 bg-gray-200 animate-pulse" />
            <div className="w-full h-3 bg-gray-200 animate-pulse" />
            <div className="w-3/5 h-3 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="w-full flex h-[calc(100vh-556px)]">
        <div className="w-1/2 h-full border-r border-r-gray-200">
          <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-start items-center">
            <div className="w-100 h-3/4 bg-gray-200 animate-pulse" />
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-14 flex justify-start items-center px-5 gap-3 border-b border-b-gray-200"
            >
              - <div className="w-20 h-3 bg-gray-200 animate-pulse" />{" "}
              <div className="grow h-3 bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="w-1/2 h-full">
          <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-start items-center">
            <div className="w-100 h-3/4 bg-gray-200 animate-pulse" />
          </div>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-25 flex justify-start items-start px-5 py-3.25 gap-3 border-b border-b-gray-200"
            >
              <div className="w-7.5 h-7.5 bg-gray-200 animate-pulse" />
              <div className="grow flex flex-col gap-3">
                <div className="w-full h-3 bg-gray-200 animate-pulse" />
                <div className="w-full h-3 bg-gray-200 animate-pulse" />
                <div className="w-3/5 h-3 bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
