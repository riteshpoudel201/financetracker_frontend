const ExpenseIcon = ({ className }) => {
  return (
    <div className={`w-24 h-24 ${className}`}>
      <svg
        viewBox="0 0 1024 1024"
        className="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M731.39 109.04L511.96 361.72H638.3v306.56c0 74.07-29.42 145.1-81.8 197.48l-11.29 11.29c154.24 0 279.27-125.03 279.27-279.27V361.72h126.34L731.39 109.04z m19.95 179.53v309.19c0 48.23-16.65 92.64-44.5 127.79 3.05-18.77 4.6-37.9 4.6-57.29V288.58h-39.09l59.04-67.98 59.04 67.98h-39.09z"
            fill="currentColor"
          ></path>
          <path
            d="M329.1 402.29c-141.38 0-256 114.62-256 256s114.62 256 256 256c141.39 0 256-114.62 256-256s-114.61-256-256-256z m0 438.85c-100.83 0-182.86-82.03-182.86-182.86s82.03-182.86 182.86-182.86 182.86 82.03 182.86 182.86-82.03 182.86-182.86 182.86z"
            fill="currentColor"
          ></path>
          <path
            d="M393.81 529.18l-64.59 64.61-64.59-64.61-38.78 38.78L270 612.12h-32.42v54.86h64.21v18.84h-62.16v54.86h62.16v59.91h54.86v-59.91h62.18v-54.86h-62.18v-18.84h64.23v-54.86h-32.44l44.16-44.16zM146.24 292.48h292.57v73.14H146.24zM146.24 182.48h402.29v73.14H146.24z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default ExpenseIcon;
