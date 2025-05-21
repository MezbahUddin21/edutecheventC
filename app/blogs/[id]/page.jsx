'use client'
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "@/Components/Header";
import BuyTicket from "@/Components/BuyTicket";

const page = ({params}) => {

    const [data, setData] = useState(null);

    const fetchBlogData = async ()=>{
        const response = await axios.get('/api/blog',{
            params:{
                id:params.id
            }
        });

        setData(response.data);
    }

    useEffect(()=>{
        fetchBlogData();
    },[]) 


  return ( data? <>
    <div className="pt-10 px-5 md:px-12 lg:px-28">
        <Header/>

        <div className="text-center mt-24 mb-10">
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto " dangerouslySetInnerHTML={{__html:data.title}}></h1>
            <div className="flex justify-center items-center">
                <Image className="  max-auto mt-6 border border-white rounded-full w-[6vh] h-[6vh]" src={data.author_img} width={60} height={60} alt=""/>
            </div>
            <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
        </div>
    </div>


    <div className="mx-5 max-w-[1000px] md:m-auto  bg-whiterelative bg-white p-7">
        <Image className="border-4 border-white " src={data.image} width={1280} height={720} alt=""/>
        
        <div className="md:flex sm:space-x-4 md:space-x-7">
            <div className="blog-content pt-5 w-64 flex-auto" dangerouslySetInnerHTML={{__html:data.description}}></div>
            <BuyTicket className="w-32 flex-auto mt-2"/>
        </div>


        <div className="flex space-x-20">
            <div className="py-24">
                <p className="text-black font font-semibold my-4">Share this article on social media</p>
                <div className="flex">
                    <Image src={assets.facebook_icon} width={50} alt= ""/>
                    <Image src={assets.twitter_icon} width={50} alt= ""/>
                    <Image src={assets.googleplus_icon} width={50} alt= ""/>
                </div> 
            </div>

        </div>
    </div>
    
    <div className="pt-10 px-5 md:px-12 lg:px-28"><Footer/></div>
    </>:<></>
 )
};

export default page;
