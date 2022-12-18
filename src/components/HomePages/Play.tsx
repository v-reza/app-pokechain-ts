import React from "react";
import { useNavigate } from "react-router-dom"
const Play = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-col space-y-8 col-span-2">
        <div className="p-4 bg-indigo-500 w-full  flex items-center justify-center rounded-lg cursor-pointer text-white font-bold hover:bg-indigo-600">
          <span>Create New Match</span>
        </div>

        <div className="p-4 bg-indigo-500 w-full  flex items-center justify-center rounded-lg cursor-pointer text-white font-bold hover:bg-indigo-600"
        onClick={() => navigate("/battle")}>
          <span>Find Open Match</span>
        </div>

        <div className="p-4 bg-indigo-500 w-full  flex items-center justify-center rounded-lg cursor-pointer text-white font-bold hover:bg-indigo-600">
          <span>Join By Match ID</span>
        </div>
      </div>
    </>
  );
};

export default Play;
