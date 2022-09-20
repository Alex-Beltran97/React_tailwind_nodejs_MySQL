import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContex";

const TaskPage = () => {
  const { tasks,loadTasks } = useTasks();
  
  useEffect(() => {
    loadTasks();
  }, []);

  const renderMain = ()=>{
    if(tasks.length===0){
      return (<h2 className="text-white text-xl text-center m-10">No tasks yet!</h2>)
    }

    return (<>
        {tasks.map(item=>(
          <TaskCard task={item} key={item.id} />
        ))}
    </>)
  };

  return (<>
    <h1 className="text-5xl text-white font-bold text-center">Tasks</h1>
    <div className="grid grid-cols-3 gap-2">
      {renderMain()}
    </div>
  </>);
};
 
export default TaskPage;