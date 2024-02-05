'use client'
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";



//By default Jscript is asynchronous(Compiler makes all hits and go) but we put 
//async(compli makes first hit to db lets it comlete then go for sec hit after completion)
// to get it done synchronous
export default function TopicsList() {
//many things will be there in response like raw data and we want to take out only "topics"
//from getTopics(); Which we transferd from api from  
//await says first complete first task then start(send/recv) another.  
  const [topics,setTopics]  = useState([])
  const [filter, setFilter] = useState(""); 
  const getTopics = () => {
    try {
      //Here we are using fetch method to fetch data from the api, 
      //await says to compiler just stay on this line, dont move to load other
      //components of DOM unless u get response from the db. So once he get response
      //from db then it start to go load navbar and load data in topics also.
      //
      fetch("http://localhost:3000/api/topics", {
        cache: "no-store",
        //So as await is no used we are using then so what will happen,compiler will
        //keep moving to add navbar and other things, and then will help to load data.
      }).then(res=>res.json()).then(res=>{
        setTopics(res.topics)
      });
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filtered topics based on the filter value
  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    getTopics();
  }, []);

  return (
    <>
     <input
        type="text"
        placeholder="Filter by title..."
        value={filter}
        onChange={handleFilterChange}
      />
      {filteredTopics.map((t) => (
        <div
        //Nextjs updates data of each component on key, So he assigns each component 
        // a unique key instead of runngin any algo he decides to take id of every
        //object as key so he assigns id to key prop and locks the div for it and, then
        //further it starts assigning the remaining things title and description and 
        //once done. Control will go to map and will make another key-id combination
        //and will create another div next to it as per the design is provided in 
        //the classnames of div 
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div style={{ whiteSpace: "pre-line", textAlign:'justify', textJustify:'inter-word' }} dangerouslySetInnerHTML={{ __html: t.description }}></div>
          </div>

          <div className="flex gap-2">
            {/* Same time while map and making populating data it also give id of the
            each object like remove and edit btn on same time instead of figuring
             when we click on these buttons 
            */}
            <RemoveBtn id={t._id} />
            <Link href={`/topic/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
