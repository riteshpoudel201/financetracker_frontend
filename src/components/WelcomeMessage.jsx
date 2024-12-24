import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

const WelcomeMessage = () => {
  const { user } = useUserContext();
  const [isWelcomeMessageShown, setWelcomeMessageShown] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("welcomeMessageShown")) {
      setWelcomeMessageShown(false);
      sessionStorage.setItem("welcomeMessageShown", "true");

      const timer = setTimeout(() => {
        setWelcomeMessageShown(true);
      }, 5000);

      return () => {
        clearTimeout(timer)
      }; 
    }
  }, [isWelcomeMessageShown]);

  return (
    <>
      {!isWelcomeMessageShown && (
        <div className="bg-blue-300 font-bold flex items-center rounded-lg w-[95vw] mx-auto mt-4 px-3 py-4">
            <div className="pl-4">
          Welcome,&nbsp;
          <span className="text-blue-800">{user?.name?.split(" ")[0]}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeMessage;
