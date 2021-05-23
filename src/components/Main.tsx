import React, { useState } from 'react';
import firebase from 'firebase';
import { useAddTaskForUser, useFetchTasksForUser, useMarkTaskComplete } from '../hooks';
import { Button, Empty, Row, Spin, Input, DatePicker, Col, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import Checkbox from 'antd/lib/checkbox/Checkbox';


const Main: React.FC<{ user: firebase.User }> = ({ user }) => {
  const { tasks, loading } = useFetchTasksForUser(user);
  const addTask = useAddTaskForUser(user);
  const completeTask = useMarkTaskComplete();
  const [newTask, updateNewTask] = useState<ITaskInput>({});
  const [showNewTaskInputs, setShowNewTaskInputs] = useState(false);
  const invalidInput = !newTask.description || !newTask.title || !newTask.dueDate;

  const handleAddTask = () => {
    addTask(newTask);
    setShowNewTaskInputs(false);
    updateNewTask({});
  }
  return (
    <div className='mx-auto' style={{ maxWidth: '400px' }}>
      {!showNewTaskInputs && <Button
        icon={<PlusOutlined style={{ verticalAlign: 'initial' }} />}
        type='primary'
        onClick={() => setShowNewTaskInputs(true)}
        className='mb-2'>
        Add Task
      </Button>}

      {
        showNewTaskInputs && <Form onFinish={handleAddTask} >
          <Row className='mb-2 '>
            <Col className='mr-4 flex-grow'>
              <Input
                value={newTask.title}
                placeholder='Title'
                onChange={e => updateNewTask(prev => ({ ...prev, title: e.target.value }))}
              />
            </Col>
            <Col>
              <DatePicker
                placeholder='Due Date'
                value={newTask.dueDate ? moment(newTask.dueDate) : undefined}
                onChange={(date, dateString) => updateNewTask(prev => ({ ...prev, dueDate: dateString }))}
              />
            </Col>
          </Row>

          <Input
            value={newTask.description}
            placeholder='Description'
            onChange={e => updateNewTask(prev => ({ ...prev, description: e.target.value }))}
            className='mb-2'
          />

          <Row>
            <Button
              type='ghost'
              onClick={() => {
                setShowNewTaskInputs(false);
                updateNewTask({})
              }}
              className='ml-auto mb-2 mr-2'>
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

      { loading && <Spin />}
      { !loading && !tasks.length && <Empty />}
      {
        tasks.map((task, i) =>
          <Row className='align-center' key={i}>
            <Checkbox
              className='my-auto mr-4'
              checked={task.completed}
              onChange={(e) => completeTask(task, e.target.checked)}
            />
            <div className='text-lg'>{task.title}</div>
          </Row>)
      }

    </div >
  );
}

export default Main
