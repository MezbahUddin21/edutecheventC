import { NextResponse } from "next/server";
import { ConnectDB } from '@/lib/config/db';
import EventModel from '@/lib/models/EventModel';
import {writeFile} from 'fs/promises';
const fs = require('fs')

const LoadDB = async ()=>{
    await ConnectDB();
}

LoadDB();

//API endpoint to get all events

export async function GET(request){

    const eventId =request.nextUrl.searchParams.get("id");
    if(eventId){
        const event = await EventModel.findById(eventId);
        return NextResponse.json(event);
    }else{
        const events=await EventModel.find({});
        return NextResponse.json({events});
    }


}

//API endpoint for uploading event

export async function POST(request) {
    const formData = await request.formData();
    const timestamp= Date.now();

    const image=formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const author_img=formData.get('author_img');
    const author_imgByteData = await author_img.arrayBuffer();
    const authBuffer = Buffer.from(author_imgByteData);
    const authPath = `./public/${timestamp}_${author_img.name}`;
    await writeFile(authPath, authBuffer);
    const authImgUrl = `/${timestamp}_${author_img.name}`;

    const eventData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        ticket_price:`${formData.get('ticket_price')}`,
        image: `${imgUrl}`,
        author_img: `${authImgUrl}`,
    }

    await EventModel.create(eventData);
    console.log("Event Saved");


    return NextResponse.json({success:true, msg:"Event Added"});

}


    //Creating API endpoint to delete event

    export async function DELETE(request) {
        const id = await request.nextUrl.searchParams.get('id');
        const event = await EventModel.findById(id);
        fs.unlink(`./public${event.image}`,()=>{});
        fs.unlink(`./public${event.author_img}`,()=>{});
        await EventModel.findByIdAndDelete(id);
        return NextResponse.json({msg:"Event Deleted"});
    }