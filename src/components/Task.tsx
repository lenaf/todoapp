import React, { useState } from 'react';
import { useDeleteTask, useMarkTaskComplete } from '../hooks';
import { Button, Dropdown, Menu, Row } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment';
import { EllipsisOutlined } from '@ant-design/icons';
import EditTask from './EditTask';

const Task: React.FC<{ task: ITask }> = ({
  task
}) => {
  const [isInEditState, setIsInEditState] = useState(false);
  const completeTask = useMarkTaskComplete();
  const deleteTask = useDeleteTask();

  return (
    <Row
      align='middle'
      className='bg-gray-50 mb-2 p-2 shadow'
    >
      <Checkbox
        className='my-auto mr-4'
        checked={task.completed}
        onChange={(e) => completeTask(task, e.target.checked)}
      />
      {isInEditState ?
        <EditTask task={task} onClose={() => setIsInEditState(false)} /> :
        <Row align='middle' className='flex-grow'>
          <div className='text-lg mr-4'>{task.title}</div>
          <div><small>{moment(task.dueDate).format('MMM Do')}</small></div>
          <Dropdown className='ml-auto' overlay={
            <Menu>
              <Menu.Item onClick={() => { setIsInEditState(true) }}>
                Edit
            </Menu.Item>
              <Menu.Item onClick={() => { deleteTask(task) }}>
                Delete
            </Menu.Item>
            </Menu >
          } >
            <Button type='text' shape='circle' icon={<EllipsisOutlined style={{ verticalAlign: 'initial' }} />} onClick={e => e.preventDefault()} />
          </Dropdown>
        </Row>
      }
    </Row>
  );
}

export default Task
