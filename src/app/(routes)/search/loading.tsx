export default function Page() {
  return (
    <div>
      <div className="w-full h-24 flex justify-start items-center px-5 border-b border-b-gray-200">
        <div className="w-100 h-3/4 bg-gray-200 animate-pulse" />
      </div>
      <div className="w-full h-14 flex justify-start items-center px-5 border-b border-b-gray-200">
        <div className="w-100 h-3/4 bg-gray-200 animate-pulse" />
      </div>
      <div className="w-full grid grid-cols-5 place-items-start gap-px">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="w-full h-50 bg-gray-200 animate-pulse" />
        ))}
      </div>
      <div className="w-full h-14 flex justify-start items-center px-5 border-b border-b-gray-200">
        <div className="w-100 h-3/4 bg-gray-200 animate-pulse" />
      </div>
      <div className="w-full grid grid-cols-5 place-items-start gap-px">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="w-full h-50 bg-gray-200 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
