export const SkeletonLoading = () => {
  return (
    <div className="animate-pulse mt-20 flex flex-col gap-4">
      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full w-36" />
      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full" />
      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full" />
      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full" />
      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full" />
    </div>
  );
};
