const TransactionIcon = ({ className }) => {
  return (
    <div className={`w-6 h-6 ${className}`}>
      <svg
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fill="currentColor"
            d="M16 14l-3 2v-1h-4.75l2-2h2.75v-1l3 2z"
          ></path>{" "}
          <path fill="currentColor" d="M0 2l3-2v1h4.75l-2 2h-2.75v1l-3-2z"></path>{" "}
          <path
            fill="currentColor"
            d="M9.74 0l-9.74 9.74 6.26 6.26 9.74-9.74zM1.39 9.74l8.35-8.35 4.87 4.87-8.35 8.35z"
          ></path>{" "}
          <path
            fill="currentColor"
            d="M4.17 9.74l-0.7 0.7 2.090 2.090 0.7-0.7 0.74 0.69 2.74-2.78c-0.445 0.445-1.060 0.721-1.74 0.721-1.359 0-2.461-1.102-2.461-2.461 0-0.68 0.275-1.295 0.721-1.74l-2.78 2.74z"
          ></path>{" "}
          <path
            fill="currentColor"
            d="M12.52 5.57l-2.090-2.090-0.7 0.7-0.73-0.7-2.74 2.78c0.445-0.445 1.060-0.721 1.74-0.721 1.359 0 2.461 1.102 2.461 2.461 0 0.68-0.275 1.295-0.721 1.74l2.78-2.74-0.7-0.7z"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
};

export default TransactionIcon;
