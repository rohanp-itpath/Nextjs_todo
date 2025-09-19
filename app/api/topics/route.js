import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../libs//mongodb";
import Topic from "@/models/topic";

export async function GET(request) {
    debugger;
    await connectMongoDB();
    const topics = await Topic.find();

    return NextResponse.json({topics})
}

export async function POST(request) {
  try {
    debugger;
    const { title, description } = await request.json();

    await connectMongoDB();

    await Topic.create({ title, description });

    return NextResponse.json({ message: "Topic created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { message: "Error creating topic" },
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
        return NextResponse.json({ message: "Error deleting topic" }, { status: 500 });
    }
}