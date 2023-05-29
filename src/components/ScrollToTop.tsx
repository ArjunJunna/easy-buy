const ScrollToTop = () => {
  return (
    <button
      className=" fixed right-2 bottom-2 rounded-full shadow-black shadow-2xl"
      onClick={() => window.scrollTo(0, 0)}
    >
      <i className="bi bi-arrow-up-circle font-body font-semibold text-slate-500 hover:text-slate-400 text-3xl "></i>
    </button>
  );
};

export default ScrollToTop;
