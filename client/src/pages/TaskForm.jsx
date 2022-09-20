import { Formik,Form } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContex";

const TaskForm = () => {
  const [task, setTask] = useState({
    title:"",
    description:""
  });

  const navigate = useNavigate();

  const { createTask,getTask,updateTask } = useTasks();

  const {id} = useParams();

  const loadTask = async (idTask) => {
    const result  = await getTask(idTask);
    setTask({
      title:result.title,
      description:result.description
    });
  };

  useEffect(() => {
    id&&loadTask(id);
    setTask({
      title:"",
      description:""
    });
  }, [id]);

  return (<>
    <div>
      <Formik
        initialValues={task}
      
        enableReinitialize={true}
      
        onSubmit={async (values,{resetForm})=>{
          if(id){
            console.log(await updateTask(id,values));
            setTask({
              title:"",
              description:""
            });
            
            navigate("/");
          }else{
            createTask(values); 
          }
          resetForm();
        }}
      >
        {({handleChange,values,isSubmitting})=>(
          <Form className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
            <h1 className="text-xl font-bold uppercase text-center">{id?"Edit Task":"Create Task"}</h1>
            <label className="block">Title</label>
            <input 
              className="px-2 py-1 rounded-sm w-full"
              type="text" 
              name="title" 
              placeholder="Write a title"
              onChange={handleChange}
              value={values.title}
            />
            <label className="block">Description</label>
            <textarea 
              className="px-2 py-1 rounded-sm w-full"
              name="description" 
              rows="3"
              placeholder="Write a description"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            <button className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md" type="submit" disabled={isSubmitting}>{isSubmitting?"Saving...":'Submit'}</button>
          </Form>
        )}
      </Formik>
    </div>
  </>);
};
 
export default TaskForm;