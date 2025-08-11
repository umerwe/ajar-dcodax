const Loader = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center mt-30 ${className}`}>
      <div
        className="relative w-12 h-12"
      >
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: "conic-gradient(transparent 0%, #00e6f6 40%, #0061ff 80%, transparent 100%)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))"
          }}
        ></div>
        <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900"></div>
      </div>
    </div>
  );
};

export default Loader;