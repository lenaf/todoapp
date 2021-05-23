import React from 'react';
import firebase from 'firebase';
import { useFetchTasksForUser } from '../hooks';
import { Empty, Spin } from 'antd';
import AddTask from './AddTask';
import Task from './Task';


const LoggedIn: React.FC<{ user: firebase.User }> = ({ user }) => {
  const { tasks, loading } = useFetchTasksForUser(user);

  return (
    <div className='mx-auto' style={{ maxWidth: '400px' }}>
      <AddTask className='mb-4' user={user} />
      { loading && <Spin />}
      { !loading && !tasks.length && <Empty />}
      {tasks.map((task, i) =>
        <Task
          task={task}
          key={i}
        />)}
    </div >
  );
}

export default LoggedIn
