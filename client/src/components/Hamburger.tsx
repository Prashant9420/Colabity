const Hamburgur = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <button className={`block top-4 transition-all duration-500 z-[-1]`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-8 w-8 text-${isOpen ? "neutral hover:text-base-100" : "accent hover:text-secondary"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  );
};

export default Hamburgur;
