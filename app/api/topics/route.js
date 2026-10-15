import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../libs/mongodb";
import Topic from "@/models/topic";
import mongoose from "mongoose";

export async function GET(request) {
  await connectMongoDB();
  const topics = await Topic.find();

  return NextResponse.json({ topics });
}

export async function POST(request) {
  try {
    // Parse JSON from Next.js Request
    const body = await request.json();
    console.log("POST/api/topics body:", body);
    const { title, description } = body || {};

    // Validate input
    if (!title || !description) {
      console.log("Validation Failed:")
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Connect to DB and create topic
    await connectMongoDB();
    console.log("mongoose readyState:",mongoose.connection?.readyState);
    const newTopic = await Topic.create({ title, description });

    return NextResponse.json({ topic: newTopic }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function DELETE(request){
//     const id = request.nextUrl.searchParams.get("id");
//     await connectMongoDB();
//     await Topic.findByIdAndDelete(id);
//     return NextResponse.json({message: "Topic deleted"}, {status: 200})
// }

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log("Deleting topic with ID:", id); // Add this for debugging

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json(
      { message: "Error deleting topic" },
      { status: 500 }
    );
  }
}
