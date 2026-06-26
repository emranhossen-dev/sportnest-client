const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-900"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-600 dark:border-t-emerald-500 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;