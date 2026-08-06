'use client'
import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import axios from "axios";

const EVENT_TYPES = [
  "All",
  "Conference",
  "Workshop",
  "Seminar",
  "Hackathon",
  "Webinar",
  "Bootcamp",
  "Tech Talk",
];

const EventList = () => {
  const [menu, setMenu] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/event");
      setEvents(response.data.events || []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const visible = events.filter((e) => menu === "All" || e.category === menu);

  return (
    <div>
      {/* Heading */}
      <div className="text-center sm:my-10 md:my-16">
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900">
          Featured Events
        </h1>
        <p className="mt-4 max-w-[740px] mx-auto text-xs sm:text-base text-gray-500">
          Your gateway to discovering premier Educational, IT, and Technology events
        </p>
      </div>

      {/* Filter pill bar */}
      <div className="flex flex-wrap justify-center gap-2 my-8 px-4">
        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setMenu(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
              menu === type
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-500 hover:text-gray-900"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800" />
        </div>
      ) : visible.length === 0 ? (
        <p className="text-center text-gray-400 py-16">
          No events found for this type.
        </p>
      ) : (
        <div className="flex flex-wrap justify-around gap-6 mb-16">
          {visible.map((item, index) => (
            <EventItem
              key={index}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
              author={item.author}
              profile={item.author_img}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
