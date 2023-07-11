import { ITask } from '@/types/tasks'
import { draftMode } from 'next/dist/client/components/headers'
import React from 'react'
import Task from './Task';



interface TaskListProps {
    tasks :ITask[];
}

export const TaskList:React.FC<TaskListProps> = ({tasks}) => {
  return (
    <div className="overflow-x-auto">
  <table className="table">
   
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task)=><Task key={task.id} task={task} />)}
   
    </tbody>
  </table>
</div>
  )
}

export default TaskList
