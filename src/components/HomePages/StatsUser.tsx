import React from "react";
import bgToken from "../../dist/assets/token.png";
import level from "../../dist/assets/level.png";
import useUser from "../../hooks/useUser";

const StatsUser = () => {
  const { currentUser } = useUser();
  return (
    <>
      <div className="flex flex-col col-span-2 space-y-2">
        <div className="flex items-center mb-4 ml-4 text-lg font-medium">
          Welcome back &nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
            {currentUser?.username}!
          </span>
        </div>
        <div className="flex items-center justify-between lg:block">
          <div className="flex items-center">
            <img alt="level" src={level} width={50} height={50} />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Level 1</h2>
            </div>
          </div>
          <div className="flex items-center ml-1 mt-2">
            <img alt="token" src={bgToken} width={40} height={40} />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{parseFloat(currentUser?.profile.token).toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsUser;
