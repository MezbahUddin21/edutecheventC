import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import ArticleModel from "@/lib/models/ArticleModel";
import { writeFile } from "fs/promises";
const fs = require("fs");

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

// GET all articles or a single article by id
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const article = await ArticleModel.findById(id);
    return NextResponse.json(article);
  }
  const articles = await ArticleModel.find({});
  return NextResponse.json({ articles });
}

// POST — upload a new article
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const author_img = formData.get("author_img");
  const author_imgByteData = await author_img.arrayBuffer();
  const authBuffer = Buffer.from(author_imgByteData);
  const authPath = `./public/${timestamp}_${author_img.name}`;
  await writeFile(authPath, authBuffer);
  const authImgUrl = `/${timestamp}_${author_img.name}`;

  const articleData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: imgUrl,
    author_img: authImgUrl,
  };

  await ArticleModel.create(articleData);
  console.log("Article Saved");

  return NextResponse.json({ success: true, msg: "Article Added" });
}

// DELETE an article by id
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const article = await ArticleModel.findById(id);
  fs.unlink(`./public${article.image}`, () => {});
  fs.unlink(`./public${article.author_img}`, () => {});
  await ArticleModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Article Deleted" });
}
