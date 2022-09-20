import { useTasks } from '../context/TaskContex';
import { useNavigate } from 'react-router-dom';

const styleRow = {
  border:'1px solid black',
  textAlign:'center',
  padding:"0 8px"
};

const TaskCard = ({task:item}) => {
  const { deleteTask,toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = (taskDone)=>{
    toggleTaskDone(taskDone);
  };

  return (<>
    <div className='bg-zinc-700 rounded-md p-4 text-white'>
      <header className='flex justify-between '>
        <h1 className='text-sm font-bold'>{item.title}</h1>
        <div>{item.done?"🟢":"⚪"}</div>
      </header>
      <p className='text-xs'>{item.description}</p>
      <div>{item.createAt}</div>
      <div className='flex gap-x-2'>
        <button className='bg-slate-300 px-2 py-1 text-black' onClick={()=>navigate(`/edit/${item.id}`)}>Update</button>
        <button className='bg-slate-300 px-2 py-1 text-black' onClick={()=>deleteTask(item.id)}>Delete</button>
        <button className='bg-slate-300 px-2 py-1 text-black' onClick={()=>handleDone(item.id)}>Toggle Done</button>
      </div>
    </div>
  </>);
};
 
export default TaskCard;