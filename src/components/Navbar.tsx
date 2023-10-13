import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed h-16 bg-slate-500 w-full top-0">
      <div className="grid grid-cols-2">
        <h1 className="text-white p-4 text-[18px]">Jose Daniel Blanco</h1>
        <div className="flex justify-end items-end">
          <Link to={"/"}>
            <h2 className="text-white p-4 text-[17px] ">Home</h2>
          </Link>
          <Link to={"/table"}>
            <h2 className="text-white p-4 text-[17px] px-8">Table</h2>
          </Link>

          <a target="_blank" className="text-white p-4 text-[17px] " href="https://github.com/Jhose9">GitHub</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
