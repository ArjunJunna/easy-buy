const SkeletonCard = () => {
  return (
    <>
      <div className="flex flex-col gap-y-1.5 h-64 w-64 rounded-md bg-slate-100 p-2">
        <div className="h-[70%] w-full bg-slate-300 rounded-md"></div>
        <div className="h-[15%] w-full bg-slate-300 rounded-md"></div>
        <div className="h-[15%] w-full bg-slate-300 rounded-md"></div>
      </div>
    </>
  );
};

export default SkeletonCard;
