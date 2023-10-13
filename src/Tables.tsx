import React from "react";
import Navbar from './components/Navbar'
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "./components/ui/button";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Tables() {
  const [data, setdata] = useState([]);

 

  interface Task {
    task: string;
    tag: string;
    description?: string;
  }

  useEffect(() => {
    const GetValue = async () => {
      const taskList = await getDocs(collection(db, "TaskList"));
      const date: Task[] = [];
      taskList.forEach((value) => {
        date.push({ ...value.data(), id: value.id });
      });

      setdata(date);
    };
    GetValue();
  }, []);

  async function handleDelete(taskId: string) {
    try {
      const taskRef = doc(collection(db, "TaskList"), taskId);
      const newData = data.filter((item) => item.id !== taskId);

      setdata(newData);

      await deleteDoc(taskRef);
      console.log("Tarea eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  }

  const Edit = (id: string) => {
    localStorage.setItem("id", id);
  };

  return (
    <>
    <Navbar/>
    <div className="w-[600px] mx-[600px] my-[200px]">
      <h1 className="text-[50px] text-center">Todo</h1>
      <Table>
        <TableCaption>A list of your Recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{invoice.task}</TableCell>
              <TableCell>{invoice.tag}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell className="text-right">
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="mr-4" variant="outline">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(invoice.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Link to={"/edit"}>
                    <Button onClick={() => Edit(invoice.id)}>Edit</Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </>
  );
}

export default Tables;
