
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [isFileSubMenuOpen, setIsFileSubMenuOpen] = useState(false);
  const [isViewSubMenuOpen, setIsViewSubMenuOpen] = useState(false);

  const toggleFileSubMenu = () => {
    setIsFileSubMenuOpen(!isFileSubMenuOpen);
    setIsViewSubMenuOpen(false); // Close the View submenu when File submenu opens
  };

  const toggleViewSubMenu = () => {
    setIsViewSubMenuOpen(!isViewSubMenuOpen);
    setIsFileSubMenuOpen(false); // Close the File submenu when View submenu opens
  };

  return (
    <nav className="flex justify-center items-center bg-gradient-to-r from-teal-600 to-cyan-500 px-8 py-3 fixed top-0 w-full z-50 mx-auto">
      {/* Main Menu Item 1 */}
      <Link href="/topic">
        <span className="text-white font-bold cursor-pointer text-lg">Home</span>
      </Link>

      {/* View Menu with Submenu */}
      <div className="relative group">
        <span
          onClick={toggleViewSubMenu}
          className="text-white font-bold cursor-pointer group-hover:text-yellow-300 text-lg ml-4"
        >
          View
        </span>

        {/* Submenu for View Menu */}
        {isViewSubMenuOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white p-2 space-y-2 shadow-md border rounded-md">
            <Link href="/dayRun">
              <span className="block text-gray-800 hover:text-blue-600 cursor-pointer text-sm">
                DayRun
              </span>
            </Link>
            <Link href="/topic">
              <span className="block text-gray-800 hover:text-blue-600 cursor-pointer text-sm">
                Topics
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* File Menu with Tasks Submenu */}
      <div className="relative group">
        <span
          onClick={toggleFileSubMenu}
          className="text-white font-bold cursor-pointer group-hover:text-yellow-300 text-lg ml-4"
        >
          File
        </span>

        {/* Submenu for File Menu */}
        {isFileSubMenuOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white p-2 space-y-2 shadow-md border rounded-md">
            <Link href="/topic/addTopic">
              <span className="block text-gray-800 hover:text-blue-600 cursor-pointer text-sm">
                Topics
              </span>
            </Link>
            <Link href="/dayRun/addTask">
              <span className="block text-gray-800 hover:text-blue-600 cursor-pointer text-sm">
                Tasks
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Log Out Button */}
      <button onClick={() => signOut()} className="text-white font-bold cursor-pointer text-lg ml-4">
        Log Out
      </button>
    </nav>
  );
}






// import Link from "next/link";
// import { signOut } from "next-auth/react";

// export default function  Navbar(){
//     return (
//         <nav className="flex justify-between items-center bg-slate-800 px-8 py-3"> 
//             <Link className="text-white font-bold" href={'/topic'}>GTCoding</Link>
//             <Link className="bg-white p-2" href={"/topic/addTopic"}>Add Topic</Link>
//             <Link className="bg-white p-2" href={"/dayRun/addTask"}>Add Task</Link>
//             <button onClick={() => signOut()}
//             //When we are signed out we shud'nt be able to see dashboard for that we will use middlewear
//              className="bg-white p-2" >Log Out</button>

//         </nav>
//     )
// }