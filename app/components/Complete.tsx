// "use client";

import { ITask } from '@/types/tasks'
import {FiEdit,FiTrash2} from 'react-icons/fi'
import {FcApprove} from 'react-icons/fc'
import React, { FormEventHandler, useState } from 'react'
import Modal from './Modal'
import { useRouter } from "next/navigation";
import { deleteTask, editTask } from '@/api';
import { v4 as uuidv4 } from 'uuid';

 interface TaskProps {
    task:ITask
 }
export const Complete: React.FC<TaskProps> = ({task}) => {
  const router =useRouter();
  const [OpenModalEdit, setOpenModalEdit] =useState<boolean>(false);
  const [OpenModalDelete, setOpenModalDelete] =useState<boolean>(false);
  const[taskToEdit , setTaskToEdit] = useState<string>(task.title);
  const[taskToEdit1 , setTaskToEdit1] = useState<string>(task.description);
  

  const handleSubmitEditTask : FormEventHandler<HTMLFormElement> = 
  async(e) =>{
    e.preventDefault();
    
      e.preventDefault ();
      await editTask({
        id:task.id,
        title: taskToEdit,
        description:taskToEdit1
      });
   
      setTaskToEdit(""),setTaskToEdit1("");
      setOpenModalEdit(false),setOpenModalEdit(false);
    router.refresh();
  }

  const handleDeleteTask = async (id:string) =>{
    await deleteTask(id);
    setOpenModalDelete(false);
    router.refresh();
  }

  
  return (
    <tr key={task.id}>
      
        <td >{task.title}</td>
        <td >{task.description}</td>
        <td className='flex gap-5'>
          
          <FcApprove onClick={()=> setOpenModalEdit(true)} cursor='pointer' className='text-blue-500' size={25} />

        <Modal modalOpen={OpenModalEdit} setModalOpen={setOpenModalEdit}>

<h3 className="font-bold text-lg">Progress new Task</h3>
<div>
<form onSubmit={handleSubmitEditTask}>
<div className="modal-action form-control w-full">


  {/* <label className="label">
    <span className="label-text">Ttile</span>
  </label>
  <input value={taskToEdit} onChange={(e) => setTaskToEdit(e.target.value)}
  type="text" placeholder="Type here" className="input input-bordered w-full" />

<label className="label ">
    <span className="label-text ">Description</span>
  </label>
  <input value={taskToEdit1} onChange={(e) => setTaskToEdit1(e.target.value)}
  type="text" placeholder="Type here" className="input input-bordered w-full" /> */}

<button type="submit" className="btn btn-success my-9">
Complete
</button>
</div>




</form>


</div>
        </Modal>
        

        {/* <FiTrash2 onClick={()=> setOpenModalDelete(true)} cursor='pointer' className='text-red-500' size={25} />
       

        <Modal modalOpen={OpenModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className='text-lg'>Are you sure , you want to delete this task?</h3>
          <div className='modal-action'>
            <button className='btn bg-red-600'
            onClick={() => handleDeleteTask(task.id)}
            >Yes</button>
          </div>
        </Modal> */}
        </td>
    

      </tr>
  )
}
export default Complete
