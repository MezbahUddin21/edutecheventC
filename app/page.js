'use client'
import Subscribe from "@/Components/adminComponents/Subscribe";
import EventList from "@/Components/EventList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import HeroSlider from "@/Components/HeroSlider";
import TopCategories from "@/Components/TopCategories";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div className="px-10 md:px-20 py-10">
      <ToastContainer theme="dark"/>
      <Header/>
      <Subscribe/>
      <HeroSlider/>
      <EventList/>
      <TopCategories/>
      <Footer/>
    </div>
  );
}
