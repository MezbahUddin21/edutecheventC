'use client'
import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const resolvedParams = React.use(params);

  const fetchArticle = async () => {
    const res = await axios.get("/api/article", {
      params: { id: resolvedParams.id },
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  if (!data) return <></>;

  return (
    <>
      <div className="pt-10 px-5 md:px-12 lg:px-28">
        <Header />

        <div className="text-center mt-24 mb-10">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {data.category}
          </span>
          <h1
            className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
          {data.author_img && (
            <div className="flex justify-center mt-6">
              <Image
                className="rounded-full border border-white"
                src={data.author_img}
                width={60}
                height={60}
                style={{ width: 60, height: 60 }}
                alt="Author"
              />
            </div>
          )}
          <p className="mt-1 pb-2 text-lg text-gray-600 max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[1000px] md:m-auto bg-white p-7">
        {data.image && (
          <Image
            className="rounded-lg w-full"
            src={data.image}
            width={1280}
            height={720}
            style={{ width: "auto", height: "auto" }}
            alt="Article featured image"
          />
        )}

        <div
          className="article-content pt-8 leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        <div className="py-12">
          <p className="text-black font-semibold mb-4">Share this article</p>
          <div className="flex gap-2">
            <Image src={assets.facebook_icon} width={40} height={40} alt="Facebook" style={{ width: "auto", height: "auto" }} />
            <Image src={assets.twitter_icon} width={40} height={40} alt="Twitter" style={{ width: "auto", height: "auto" }} />
            <Image src={assets.googleplus_icon} width={40} height={40} alt="Google+" style={{ width: "auto", height: "auto" }} />
          </div>
        </div>
      </div>

      <div className="pt-10 px-5 md:px-12 lg:px-28">
        <Footer />
      </div>
    </>
  );
};

export default page;
