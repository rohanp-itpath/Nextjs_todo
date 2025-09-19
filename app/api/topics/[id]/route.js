import { connectMongoDB } from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
 try {
        console.log("PUT request received");
        console.log("Params:", params);
        
        const { id } = params;
        const body = await request.json();
        console.log("Request body:", body);
        
        const { newTitle: title, newDescription: description } = body;
        
        await connectMongoDB();
        
        const updatedTopic = await Topic.findByIdAndUpdate(
            id, 
            { title, description },
            { new: true }
        );
        
        console.log("Updated topic:", updatedTopic);
        
        return NextResponse.json({ message: "Topic updated", topic: updatedTopic }, { status: 200 });
    } catch (error) {
        console.error("Error updating topic:", error);
        return NextResponse.json({ message: "Error updating topic", error: error.message }, { status: 500 });
    }
}


export async function GET(request,{params}){
    try{
        const {id} = params;
        await connectMongoDB();
        const topic = await Topic.findOne({_id:id});
        return NextResponse.json({topic},{status:200});
    }catch(error){
        console.error("Error fetching topic:", error);
        return NextResponse.json({message: "Error fetching topic", error: error.message},{status:500});
    }
}