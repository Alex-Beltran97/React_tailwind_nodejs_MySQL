import axios from 'axios';

const instance = ()=>axios.create({
  baseURL:'http://localhost:3004/tasks'
});

export const getTasksRequest = async ()=>
  await instance().get("");

  export const getTaskRequest = async (id)=>
  await instance().get(`/${id}`);

export const createTaskRequest = async (task)=>
  await instance().post("",task);

export const updateTaskRequest = async (id,data)=>
  await instance().put(`/${id}`,data);

export const deleteTaskRequest = async (id)=>
  await instance().delete("/"+id);

export const toggleTaskDoneRequest = async (id,done)=>
  await instance().put(`/${id}`,{done});
