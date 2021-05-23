import React, { useState } from 'react';
import { useEditTask } from '../hooks';
import { Button, Row, Form } from 'antd';
import TaskInputs from './TaskInputs';

interface IProps { task: ITask, onClose: () => void }


const EditTask: React.FC<IProps> = ({ task, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);
  const editTask = useEditTask();

  const invalidInput = !editedTask.description || !editedTask.title || !editedTask.dueDate;

  const handleAddTask = () => {
    editTask(editedTask);
    onClose();
  }

  return (
    <Form onFinish={handleAddTask} >
      <TaskInputs task={editedTask} updateTask={(task) => setEditedTask(task as ITask)} />
      <Row>
        <Button type='ghost' className='ml-auto mb-2 mr-2'
          onClick={() => {
            setEditedTask(task);
            onClose()
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
  );
}

export default EditTask
