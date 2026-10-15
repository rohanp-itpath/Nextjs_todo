"use client"
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

const RemoveBtn = ({id}) => {
  const removeTopic = async()=>{
const confirmed = confirm("Are you sure?");
    
    if (confirmed) {
      try {
        console.log("Deleting topic with ID:", id); // Debug log

        const res = await fetch(`/api/topics?id=${id}`, {
          method: "DELETE",
        });
        
        if (res.ok) {
          window.location.reload(); // Refresh the page
        } else {
          console.error("Failed to delete topic");
        }
      } catch (error) {
        console.error("Error deleting topic:", error);
      }
    }
  }
  return (
    <>
    <button onClick={removeTopic}>
    <HiOutlineTrash size={24} color='red'/>
    </button>
    </>
  )
}

export default RemoveBtn