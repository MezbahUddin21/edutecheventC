"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import { TicketCheck } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import RichTextEditor from "@/Components/RichTextEditor";

const page = () => {
  const [image, setImage] = useState(false);
  const [author_img, setAuthor_img] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Conference",
    author: "",
    ticket_price:3,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));

    console.log(data);
  };

  const onDescriptionChange = (value) => {
    setData((data) => ({ ...data, description: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("author_img", author_img);
    formData.append("image", image);
    formData.append("ticket_price", data.ticket_price);

    const response = await axios.post("/api/event", formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Conference",
        author: "",
        ticket_price:3,
      });
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="pt-5 px-5 pb-10 sm:pt-12 sm:pl-16 shadow-[1px_1px_10px_#AEB6B7] p-4 rounded-md mt-5 mb-10 h-[150vh]"
      >
        <p className="text-base">Thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-2 cursor-pointer"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            loading="eager"
            style={{ width: 'auto', height: 'auto' }}
            alt="Upload event thumbnail"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />

        <br />

        {/* Author image upload  */}

        <p className="text-base">Organization's Logo</p>
        <label htmlFor="author_img">
          <Image
            className="mt-2 rounded-full cursor-pointer"
            src={
              !author_img ? assets.upload_auth : URL.createObjectURL(author_img)
            }
            width={60}
            height={60}
            style={{ width: 'auto', height: 'auto' }}
            alt="Upload organization logo"
          />
        </label>
        <input
          onChange={(e) => setAuthor_img(e.target.files[0])}
          type="file"
          id="author_img"
          hidden
          required
        />

        <p className="text-base mt-4">Organization</p>
        <input
          name="author"
          onChange={onChangeHandler}
          value={data.author}
          className="w-full sm:w-[500px] mt-2 px-4 py-3 border"
          type="text"
          placeholder="Organization name"
          required
        />

        {/* <p className="text-base mt-4">Event Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-2 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        /> */}

        <p className="text-base mt-4">Event Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-2 px-4 py-3 border rounded-md"
          type="text"
          placeholder="Enter event title"
          required
        />

        {/* <p className="text-base mt-4">Event Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-2 px-4 py-3 border"
          type="text"
          placeholder="Write content here"
          rows={6}
          required
        /> */}

        <p className="text-base mt-4">Event Description</p>
        <RichTextEditor 
          value={data.description} 
          onChange={onDescriptionChange} 
        />
        <div style={{ height: "60px" }}></div>


        <p className="text-base mt-4">Event Type</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-44 mt-2 px-4 py-3 border rounded-md text-gray-700 cursor-pointer"
        >
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Webinar">Webinar</option>
          <option value="Bootcamp">Bootcamp</option>
          <option value="Tech Talk">Tech Talk</option>
        </select>

        <p className="text-base mt-4">Ticket Price</p>
        <input
          name="ticket_price"
          onChange={onChangeHandler}
          value={data.ticket_price}
          className="w-full sm:w-[500px] mt-2 px-4 py-3 border"
          type="number"
          // placeholder="Type here"
          required
        />

        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </>
  );
};

export default page;
