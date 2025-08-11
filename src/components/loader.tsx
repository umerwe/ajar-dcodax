const Loader = ({ className = "" }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className={`w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin ${className}`}
      ></div>
    </div>
  );
};

export default Loader;
