"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditTopicForm = ({id,title,description}) => {
  const [newTitle,setNewTitle] = useState(title)
  const [newDescription,setNewDescription] = useState(description)
  const router = useRouter()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log("hello world")
    try{
const res = await fetch(`/api/topics/${id}`,
  {
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({newTitle,newDescription})
  }
)
      if(!res.ok){
        throw new Error("Failed to update topic")
      }
      router.push("/")
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <>
      <form className="flex flex-col gap-3">
        <input
        onChange={(e)=>setNewTitle(e.target.value)}
        value={newTitle}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Title"
        />
        <input
        onChange={(e)=>setNewDescription(e.target.value)}
        value={newDescription}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Description"
        />
        <button
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
          type="submit"
          onClick={handleSubmit}
        >
          Update Topic
        </button>
      </form>
    </>
  );
};

export default EditTopicForm;
