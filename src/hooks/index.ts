
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';

export const useFetchTasksForUser = (user: firebase.User) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        firebase.firestore().collection("tasks").where("userId", "==", user.uid)
            .onSnapshot(snapshot => setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as ITask))))
        setLoading(false);
    }, [])
    return { tasks, loading }
}

export const useAddTaskForUser = (user: firebase.User) => {
    return (newTask: ITaskInput) => firebase.firestore().collection("tasks")
        .add({ ...newTask, userId: user.uid, completed: false })
}

export const useMarkTaskComplete = () => {
    return (task: ITask, completed: boolean) => firebase.firestore().collection("tasks")
        .doc(task.id).update({ completed })
}

export const useEditTask = () => {
    return (task: ITask) => firebase.firestore().collection("tasks")
        .doc(task.id).update({ task })
}

export const useDeleteTask = () => {
    return (task: ITask) => firebase.firestore().collection("tasks")
        .doc(task.id).delete()
}

