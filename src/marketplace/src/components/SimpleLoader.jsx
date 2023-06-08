import React from "react";
import { loader } from "../assets/index";

const SimpleLoader = ({ x = 150, y = 150 }) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={loader}
        alt="loader"
        className={`w-[${x}px] h-[${y}px] object-contain`}
      />
    </div>
  );
};

export default SimpleLoader;
