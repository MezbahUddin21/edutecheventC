'use client'
import ArticleTableItem from "@/Components/adminComponents/ArticleTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const res = await axios.get("/api/article");
    setArticles(res.data.articles || []);
  };

  const deleteArticle = async (mongoId) => {
    const res = await axios.delete("/api/article", { params: { id: mongoId } });
    toast.success(res.data.msg);
    fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="flex-1 pt-5 pr-5 sm:pr-10 sm:pt-12 sm:pl-16 shadow-[1px_1px_10px_#AEB6B7] p-4 rounded-md mt-5 mb-10">
      <h1 className="font-bold text-slate-700 mb-4">Article List</h1>
      <div className="max-w-[850px] overflow-x-auto">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-white border-y">
            <tr>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item, i) => (
              <ArticleTableItem
                key={i}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                author_img={item.author_img}
                date={item.date}
                deleteArticle={deleteArticle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
