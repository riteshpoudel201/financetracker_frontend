import Header from "./Header";

const ProtectedLayout = ({ children, className }) => {
  return (
    <>
      <Header />
      <div className={`min-w-screen min-h-screen w-[95vw] mx-auto h-fit ${className}`}>
        {children}
      </div>
    </>
  );
};

export default ProtectedLayout;
