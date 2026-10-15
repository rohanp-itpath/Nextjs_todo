"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!title||!description){
      alert("Please fill all the fields");
      return;
    }

    try{
      const res = await fetch('/api/topics',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({title,description})
      });
      if(res.ok){
        router.push('/');
      }
      else{
        console.log('failed adding topic');
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />
      <button
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        type="submit"
      >
        Add Topic
      </button>
    </form>
  );
};

export default AddTopic;
