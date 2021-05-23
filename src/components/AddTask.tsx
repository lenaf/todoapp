import React, { useState } from 'react';
import firebase from 'firebase';
import { useAddTaskForUser } from '../hooks';
import { Button, Row, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskInputs from './TaskInputs';

interface IProps { user: firebase.User, className?: string }


const AddTask: React.FC<IProps> = ({ user, className }) => {
  const addTask = useAddTaskForUser(user);
  const [newTask, updateNewTask] = useState<ITaskInput>({});
  const [showNewTaskInputs, setShowNewTaskInputs] = useState(false);
  const invalidInput = !newTask.description || !newTask.title || !newTask.dueDate;

  const handleAddTask = () => {
    addTask(newTask);
    setShowNewTaskInputs(false);
    updateNewTask({});
  }
  return (
    <div className={className}>
      {!showNewTaskInputs ?

        <Button
          icon={<PlusOutlined style={{ verticalAlign: 'initial' }} />}
          type='primary'
          onClick={() => setShowNewTaskInputs(true)}
          className='mb-2 ml-auto'>
          Add Task
        </Button> :

        <Form onFinish={handleAddTask} >
          <TaskInputs task={newTask} updateTask={updateNewTask} />
          <Row>
            <Button type='ghost' className='ml-auto mb-2 mr-2'
              onClick={() => {
                setShowNewTaskInputs(false);
                updateNewTask({})
              }}>
              Cancel
          </Button>
            <Button
              htmlType="submit"
              disabled={invalidInput}
              type='primary'
              className='mb-2'
            >
              Save
          </Button>
          </Row>
        </Form>

      }
    </div>
  );
}

export default AddTask
