import React, { useEffect, useRef, useState } from 'react';
import { useMarkTaskComplete } from '../hooks';
import { Row } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment';
import TaskInputs from './TaskInputs';

const Task: React.FC<{ task: ITask }> = ({ task }) => {
  const [isInEditState, setIsInEditState] = useState(false);
  const [editedTask, setEditedTask] = useState(task);



  const completeTask = useMarkTaskComplete();
  return (
    <Row
      align='middle'
      className='bg-gray-50 mb-2 p-2 shadow'
      onClick={() => { setIsInEditState(true) }}
    >
      <Checkbox
        className='my-auto mr-4'
        checked={task.completed}
        onChange={(e) => completeTask(task, e.target.checked)}
      />
      {isInEditState ?
        <div>
          <TaskInputs task={editedTask} updateTask={(task) => setEditedTask(task as ITask)} />

        </div> :
        <Row align='middle' className='flex-grow'>
          <div className='text-lg'>{task.title}</div>
          <div className='ml-auto'><small>{moment(task.dueDate).format('MMM Do')}</small></div>
        </Row>
      }
    </Row>
  );
}

export default Task
