"use client"
import Link from "next/link";
import {signOut} from "next-auth/react";



export default function  Navbar(){
    return (
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3"> 
            <Link className="text-white font-bold" href={'/topic'}>GTCoding</Link>
            <Link className="bg-white p-2" href={"/topic/addTopic"}>Add Topic</Link>
            <Link className="bg-white p-2" href={"/dayRun/addTask"}>Add Task</Link>
            <button onClick={() => signOut()}
            //When we are signed out we shud'nt be able to see dashboard for that we will use middlewear
             className="bg-white p-2" >Log Out</button>
        
        </nav>
    )
}