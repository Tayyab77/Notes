"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTask() {
    //This full line is state, We will get the data from input boxes and will store in 
    //state var title, and initialy we will keep it blank
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        //This is to prevent default behavior of which is refresing the page once btn is clicked
        //
        e.preventDefault();

        if (!title || !description) {
            alert('Title and description are required.')
            return;
        }

        try {

            const res = await fetch("https://notes-lilac-sigma.vercel.app/api/dayRun", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                //body data of web- It is commonly used for transmitting data
                // in web applications (e.g., sending some data from the server
                // to the client, so it can be displayed on a web page, or vice versa). 
                //This body is going as argument to api's param 
                body: JSON.stringify({ title, description }),
            });

            if (res.ok) {
                router.refresh()
                setTimeout(() => {
                    router.push('/dayRun');
                }, 500);
                ;

            } else {
                throw new Error("Failed to create a Task")
            }



        } catch (error) {
            console.log(error);
        }

    };

    return (
        //lets call function over here on the form on submit
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <input
                //We are creating the onchange and will access the var over here and we will
                //call it e, with e paramater we can get the data from input field, so here we 
                //type setTitle, and here will will pass (e.target.value)}, and then we need
                //to set the value of the input field to the value of title state

                //With on onChange={(e) with pick value of input box, then with setTitle func.
                //we picked value of input and straight away set given to vari title of our state
                onChange={(e) => setTitle(e.target.value)} value={title}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Task title" />



            {/* <input
         onChange={(e) => setDescription(e.target.value)} value={description}
         className="border border-slate-500 px-8 py-2"
          type="text"
           placeholder="Topic Description" />   */}
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border border-slate-500 px-8 py-2"
                type="text"
                multiple={true}
                placeholder="Task Description"
            />

            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Add Task</button>

        </form>
    )
}