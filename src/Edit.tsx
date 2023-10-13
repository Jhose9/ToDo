import React from 'react'
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Terminal, } from "lucide-react";
import { doc, updateDoc, } from "firebase/firestore";
import { db } from "./Firebase";
import {Link} from 'react-router-dom'


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Edit() {
    const [Alertvisible, setAlertvisible] = useState<boolean>(false);


    interface Task {
        task: string;
        tag: string;
        description?: string;
        [key: string]: any; 
      }

    const [Task, setTask] = useState<Task>({
        task: "",
        tag: "",
        description: "",
      });

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setTask({ ...Task, [e.target.name]: e.target.value });
    }

    const handleUpdate = async () => {
        setAlertvisible(true);
        const id = localStorage.getItem("id");
        console.log(id)
        const TaskRef=doc(db,"TaskList",id);
        try {
            await updateDoc(TaskRef,Task);
        } catch (error) {
            console.error('Error al actualizar datos:', error);
        }
    
    
        setTimeout(() => {
          setAlertvisible(false);
          window.location.href = "/table";
          localStorage.clear();

        }, 2000);
      };



  return (
    <>
    {Alertvisible && (
      <div className="fixed right-0 top-3">
        <Alert className="mr-7 bg-green-400 mt-10 w-[500px]">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Update</AlertTitle>
          <AlertDescription>Update task</AlertDescription>
        </Alert>
      </div>
    )}

    <div className="flex justify-center items-center">
      <div className="h-[500px] w-[300px] bg-slate-500 m-36 rounded-lg shadow-xl">
        <h1 className="text-white text-center py-7 text-[35px]">ToDo</h1>
        <div>
          <Label className="text-white text-[22px]  px-9" htmlFor="">
            Task
          </Label>
          <Input
            className="mb-4 mt-2 mx-[30px] w-[250px]"
            type="text"
            placeholder="Task"
            name="task"
            onChange={handleChange}
          />

          <Label className="text-white px-9 text-[22px]" htmlFor="">
            Tag
          </Label>
          <Input
            className=" mb-4 mt-2 mx-[30px] w-[250px]"
            type="text"
            placeholder="Tag"
            name="tag"
            onChange={handleChange}
          />

          <Label className="text-white px-9 text-[22px]" htmlFor="">
            Description
          </Label>
          <Input
            className=" mb-4 mt-2 mx-[30px] w-[250px]"
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-9">
          <Button
            variant={"ghost"}
            className="mx-8 my-6 bg-black text-white"
            onClick={handleUpdate}
          >
            Update
          </Button>

      <Link to={"/table"}>
      <Button variant={"secondary"} className="my-6 mr-8">
            Cancelar
          </Button>
      </Link>
        </div>
      </div>
    </div>
  </>
  )
}

export default Edit