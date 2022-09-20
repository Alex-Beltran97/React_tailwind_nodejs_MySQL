import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest,deleteTaskRequest,getTaskRequest,updateTaskRequest,toggleTaskDoneRequest } from "../api/tasks.api";

export const TaskContext = createContext();

export const useTasks = ()=>{
  const context = useContext(TaskContext);
  if(!context)
    throw new Error("useTasks must be used  whitin a TaskContextProvider");

  return context;
};

export const TaskContextProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);

  const createTask = async (values)=>{
    try{
      if(!values.title.trim()||!values.description.trim()){
        alert("Fields must be required");
        return false
      }
      const result = await createTaskRequest(values);
      console.log(result);
    }catch(error){
      console.log(error);
    };
  };

  const loadTasks = async ()=>{
    try{
      const result = await getTasksRequest();
      setTasks(result.data);
    }catch(error){
      console.log(error);
    };
  };

  const getTask = async (id)=>{
    try{
      const result = await getTaskRequest(id);
      return result.data;
    }catch(error){
      console.log(error);
    };
  };

  const updateTask = async (id,newFields)=>{
    try{
      const result = await updateTaskRequest(id,newFields);
      return result
    }catch(error){
      console.log(error);
    };
  };

  const deleteTask = async (id)=>{
    try{
      const result = await deleteTaskRequest(id);
      setTasks(tasks.filter(item=>item.id!==id));
      console.log(result);
    }catch(error){
      console.log(error);
    };
  };

  const toggleTaskDone = async (id)=>{
    const taskFound = tasks.find(task=>task.id===id);
    try{
      const result = await toggleTaskDoneRequest(id,taskFound.done===0?true:false);
      setTasks(tasks.map(item=>item.id===id?{...item,done:!item.done}:item));
    }catch(error){
      console.log(error);
    };
  };

  return (<>
    <TaskContext.Provider value={{ tasks,loadTasks,deleteTask,createTask,getTask,updateTask,toggleTaskDone }}>
      {children}
    </TaskContext.Provider>
  </>);
};
 