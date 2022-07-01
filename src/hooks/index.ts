//comment test

import firebase from "firebase";
import { useEffect, useState } from "react";

export const useFetchTasksForUser = (user: firebase.User) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) =>
        setTasks(
          snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as unknown as ITask)
          )
        )
      );
    setLoading(false);
  }, []);
  return { tasks, loading };
};

export const useAddTaskForUser =
  (user: firebase.User) => (newTask: ITaskInput) =>
    firebase
      .firestore()
      .collection("tasks")
      .add({ ...newTask, userId: user.uid, completed: false });

export const useMarkTaskComplete = () => (task: ITask, completed: boolean) =>
  firebase.firestore().collection("tasks").doc(task.id).update({ completed });

export const useEditTask = () => (task: ITask) =>
  firebase.firestore().collection("tasks").doc(task.id).update({
    description: task.description,
    title: task.title,
    dueDate: task.dueDate,
  });

export const useDeleteTask = () => (task: ITask) =>
  firebase.firestore().collection("tasks").doc(task.id).delete();
