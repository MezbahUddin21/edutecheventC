
import { assets, event_data } from "@/Assets/assets";
import React, { useEffect } from "react";
import EventItem from "./EventItem";
import { useState } from "react";
import axios from "axios";

const EventList = () => {

  const [menu,setMenu] = useState("All");
  const [events, setEvents] = useState([]);

  
  const fetchEvents = async ()=>{
    const response = await axios.get('/api/event');
    setEvents(response.data.events);
    console.log(response.data.events);
  }

  useEffect(()=>{
    fetchEvents();
  },[]);


  return (
    <div>
        <div className="text-center sm:my-10 md:my-20">
          <h1 className="text-3xl sm:text-5xl font-medium">Featured Events</h1>
          <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
            Your Gateway to Discovering Premier Educational, IT, and Technology Events
          </p>
        </div>
        <div className="my-20 mx-10 md:flex md:justify-center lg:flex md:justify-center">
            <button onClick={()=>setMenu("All")} className={menu==="All"? "bg-black text-white py-1 px-4 rounded-sm mx-4 mt-4":"mx-4 mt-4"}>All</button>

            <button onClick={()=>setMenu("Education")} className={menu==="Education"? "bg-black text-white py-1 px-4 rounded-sm mx-4 mt-4":"mx-4 mt-4"}>Education</button>
            <button onClick={()=>setMenu("Technology")} className={menu==="Technology"? "bg-black text-white py-1 px-4 rounded-sm mx-4 mt-4":"mx-4 mt-4"}>Technology</button>
            <button onClick={()=>setMenu("AI / Data Science")} className={menu==="AI / Data Science"? "bg-black text-white py-1 px-4 rounded-sm mx-4 mt-4":"mx-4 mt-4"}>AI / Data Science</button>
            <button onClick={()=>setMenu("EdTech")} className={menu==="EdTech"? "bg-black text-white py-1 px-4 rounded-sm mx-4 mt-4":"mx-4 mt-4"}>EdTech</button>
            <button onClick={()=>setMenu("Cybersecurity")} className={menu==="Cybersecurity"? "bg-black text-white py-1 px-4 rounded-sm mx-4 mt-4":"mx-4 mt-4"}>Cybersecurity</button>
            <button onClick={()=>setMenu("Startup & Innovation")} className={menu==="Startup & Innovation"? "bg-black text-white py-1 px-4 rounded-sm mx-4 mt-4":"mx-4 mt-4"}>Startup & Innovation</button>

        </div>
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 ">
          {events.filter((item)=> menu==="All"?true:item.category===menu).map((item,index)=>(<EventItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} author={item.author} profile={item.author_img}/>))}

        </div>
    </div>
  )
};

export default EventList;
