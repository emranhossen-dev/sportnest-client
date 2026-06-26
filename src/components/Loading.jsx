const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-950">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;