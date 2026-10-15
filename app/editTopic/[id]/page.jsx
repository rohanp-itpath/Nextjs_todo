import EditTopicForm from '@/components/EditTopicForm'
import React from 'react'

const getTopicByID = async(id)=>{
  try{
    const res = await fetch(`/api/topics/${id}`,{cache:"no-store"})
    if(!res.ok){
      throw new Error("Failed to fetch data")
    }
    return res.json()
  }
  catch(err){
    console.log(err)
  }
}

export default async function EditTopic({params})  {
  const {id} = params
  const {topic} =  await getTopicByID(id)
  const {title , description} = topic
  console.log("id",id)
  return (
          <EditTopicForm id={id} title={title} description={description} />
  )
}

