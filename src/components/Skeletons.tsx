
export const NoteCardSkeleton = () => {
  return (
    <div className=" border dark:border-gray-700 border-gray-300 p-4 flex flex-col gap-2 animate-pulse rounded-md">
      <h2 className="w-full h-6 dark:bg-gray-700 bg-gray-300 rounded-md"></h2>
      <div className="flex flex-wrap gap-2 mt-4">
        <p className="dark:bg-gray-700 bg-gray-300 w-16 h-6 rounded-md"></p>
        <p className="dark:bg-gray-700 bg-gray-300 w-16 h-6 rounded-md"></p>
        <p className="dark:bg-gray-700 bg-gray-300 w-16 h-6 rounded-md"></p>
      </div>
    </div>
  )
}

export const NotesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-3 mt-4">
      {
        Array.from({ length: 6 }).map((_, i) => (
          <NoteCardSkeleton key={i} />
        ))
      }
    </div>
  )
}

export const ShowNoteSkeleton = () => {
  return (
    <div className="my-2 md:my-4 p-4  animate-pulse rounded-md">
      <header className="flex gap-2 md:gap-4 items-center">
        <h2 className="max-w-lg w-full h-6 dark:bg-gray-700 bg-gray-300 rounded-md"></h2>
        <div className="ml-auto flex gap-2 md:gap-4">
          <div
            className="py-2 px-3 md:px-6 rounded-md w-10 md:w-20  h-6 dark:bg-gray-700 bg-gray-300"
          ></div>
          <div
            className="py-2 px-2 md:px-6 rounded-md w-10 md:w-20 h-6 dark:bg-gray-700 bg-gray-300"
          ></div>
        </div>
      </header>
      <div className="flex gap-2 my-4">
        <p className="dark:bg-gray-700 bg-gray-300 w-16 h-6 rounded-md"></p>
        <p className="dark:bg-gray-700 bg-gray-300 w-16 h-6 rounded-md"></p>
        <p className="dark:bg-gray-700 bg-gray-300 w-16 h-6 rounded-md"></p>
      </div>
      <div className="mt-8">
        {
          Array.from({ length: 5 }).map((_, i) => (
            <div className="flex flex-col gap-2 mb-6" key={i}>
              <div className="h-4 md:max-w-80 max-w-40 dark:bg-gray-700 bg-gray-300 rounded-md">
              </div>
              <div className="h-4 w-full dark:bg-gray-700 bg-gray-300 rounded-md">
              </div>
              <div className="h-4 w-full dark:bg-gray-700 bg-gray-300 rounded-md">
              </div>
              <div className="h-4 w-full dark:bg-gray-700 bg-gray-300 rounded-md">
              </div>
              <div className="h-4 w-full dark:bg-gray-700 bg-gray-300 rounded-md">
              </div>
              <div className="h-4 w-full dark:bg-gray-700 bg-gray-300 rounded-md">
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
