
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';


export const useFetchTasksForUser = (user: firebase.User) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebase
            .firestore()
            .collection("tasks")
            .where("userId", "==", user.uid)
            .onSnapshot(snapshot => {
                setTasks(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                } as unknown as ITask)));
                setLoading(false);
            })

    }, [])
    return { tasks, loading }
}



