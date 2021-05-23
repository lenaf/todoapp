import React, { useState } from 'react';
import firebase from 'firebase';
import { useFetchTasksForUser } from '../hooks';
import { Button, Row } from 'antd';

const emptyTask: ITask = {
  name: 'New Task',
  userId: ''
}

const Main: React.FC<{ user: firebase.User }> = ({ user }) => {
  const { tasks, loading } = useFetchTasksForUser(user);
  const [newTask, updateNewTask] = useState({ ...emptyTask, userId: user.uid })

  const addTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .add(newTask)
  }

  return (
    <div>
      <div>Hi {user.displayName}</div>
      <div>Your Tasks:</div>
      {tasks.map(task =>
        <Row>
          <div>{task.name}</div>
        </Row>)}
      <Button onClick={addTask}>Add Task</Button>
    </div >
  );
}

export default Main
