export default function Skeleton({ feature, standard }) {
  return (
    <div
      className="animate-pulse"
      role="status"
      aria-busy="true"
      aria-label="Loading brands"
    >

      {/* Featured skeleton: 1 col mobile, 2 cols tablet+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {Array.from({ length: feature }).map((i, index) => (
          <div key={index} className="flex rounded-xl overflow-hidden border border-gray-100">
            <div className="w-[280px] h-[220px] bg-gray-200 shrink-0" />
            <div className="flex flex-col justify-center gap-3 px-6 py-6 flex-1">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-4/6" />
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Standard: 1 col mobile, 2 tablet, 4 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {Array.from({ length: standard+10 }).map((i, index) => (
          <div key={index} className="flex flex-col items-center justify-between rounded-xl bg-gray-200 px-4 py-8 min-h-[160px] gap-4">
            <div className="flex-1 flex items-center justify-center w-full">
              <div className="h-6  rounded w-3/4" />
            </div>
            <div className="h-auto w-6 bg-gray-100 rounded-full" />
          </div>
        ))}
      </div>



    </div>
  )
}