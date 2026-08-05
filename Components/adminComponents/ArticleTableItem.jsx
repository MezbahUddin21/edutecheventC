import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const ArticleTableItem = ({ author_img, title, author, date, deleteArticle, mongoId }) => {
  const articleDate = new Date(date);
  return (
    <tr className="bg-slate-50 border-b">
      <th
        scope="row"
        className="items-center gap-3 flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={author_img ? author_img : assets.profile_icon}
          alt="Author"
          style={{ width: 40, height: 40 }}
        />
        <p>{author || "No author"}</p>
      </th>
      <td className="px-6 py-4">{title || "No title"}</td>
      <td className="px-6 py-4">{articleDate.toDateString()}</td>
      <td
        onClick={() => deleteArticle(mongoId)}
        className="px-6 py-4 cursor-pointer text-red-600 hover:text-red-800 text-center font-bold"
      >
        ✕
      </td>
    </tr>
  );
};

export default ArticleTableItem;
