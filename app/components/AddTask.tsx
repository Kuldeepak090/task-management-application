"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from './Modal';
import { FormEventHandler,useState } from "react";
import { addTask } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
export const AddTask = () => {
  const router =useRouter();
  const [modalOpen, setModalOpen] =useState<boolean>(false);
  const [newTaskValue , setNewTaskValue] =useState<string>('');
  const [newTaskValue1 , setNewTaskValue1] =useState<string>('');

  const handleSubmitNewTask : FormEventHandler<HTMLFormElement> = 
  async(e) =>{
    e.preventDefault();
    
      e.preventDefault ();
      await addTask({
        id:uuidv4(),
        title: newTaskValue,
        description:newTaskValue
      });
   
    setNewTaskValue(""),setNewTaskValue1("");
    setModalOpen(false),setModalOpen(false);
    router.refresh();
  }

  

  return (
    <div>
        <button onClick={() => setModalOpen(true)} className='btn btn-primary w-full'>Add New Task
        <AiOutlinePlus className='ml-2' size={18} /></button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
<h3 className="font-bold text-lg">Add new Task</h3>

{/* add task */}

<div>
<form onSubmit={handleSubmitNewTask}>
<div className="modal-action form-control w-full">


  <label className="label">
    <span className="label-text ">Ttile</span>
  </label>
  <input value={newTaskValue} onChange={(e) => setNewTaskValue(e.target.value)}
  type="text" placeholder="Type here" className="input input-bordered w-full" />

<label className="label">
    <span className="label-text">Description</span>
  </label>
  <input value={newTaskValue1} onChange={(e) => setNewTaskValue1(e.target.value)}
  type="text" placeholder="Type here" className="input input-bordered w-full" />

<button type="submit" className="btn btn-primary my-9">
  Submit
</button>
</div>




</form>


</div>
        </Modal>
    </div>
  )
}

export default AddTask
