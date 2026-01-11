const CardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-square w-full bg-gray-200 dark:bg-gray-700 rounded-t-2xl"></div>

      {/* Content skeleton */}
      <div className="p-5 flex flex-col grow space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>

        {/* Button skeleton */}
        <div className="mt-6 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
