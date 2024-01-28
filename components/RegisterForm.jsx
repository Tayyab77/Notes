"use client"
import Link from "next/link"
import { useState } from "react"
import {useRouter} from "next/navigation";
//We will useState to send store and send data to API

export default function RegisterFrom(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    console.log("Name: ", name)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("All fields are necessary");

            return;
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({email}),
            });

            const{user} = await resUserExists.json();

            if(user){
                setError("User already exist.");
                return;
            }

           const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                  name, 
                  email,
                  password,  
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("User registration failed");
            }

        } catch (error) {
            console.log("Error during registration");
        }
    };
    

    return <div className="grid place-items-center h-screen">

        <div className="shadow-lg p-5 rounded-lg border-t-4 
            border-green-400">
                <h1 className="text-xl font-bold my-4">
                    Register
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                    //This will store value of input in name state.(As we need to pic val from the input
                    //That is why we are using onchange inside class place )
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    placeholder="Full Name" />
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" placeholder="Email" />
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Register 
                    </button>

                    {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>   
                    )                 
                    }

                    <Link className="text-sm mt-3 text-right" href={"/"}>
                        Already have an account <span
                        className="underline">Login</span>
                    </Link>
                </form>
        </div>
        </div>
};