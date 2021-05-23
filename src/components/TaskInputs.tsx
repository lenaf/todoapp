import React from 'react';
import { Row, Input, DatePicker, Col } from 'antd';
import moment from 'moment';

interface IProps { task: ITask | ITaskInput, updateTask: (task: ITask | ITaskInput) => void }

const TaskInputs: React.FC<IProps> = ({ task, updateTask }) => {
  return (
    <div>
      <Row className='mb-2 '>
        <Col className='mr-4 flex-grow'>
          <Input
            value={task.title}
            placeholder='Title'
            onChange={e => updateTask({ ...task, title: e.target.value })}
          />
        </Col>
        <Col>
          <DatePicker
            placeholder='Due Date'
            value={task.dueDate ? moment(task.dueDate) : undefined}
            onChange={(date, dateString) => updateTask({ ...task, dueDate: dateString })}
          />
        </Col>
      </Row>

      <Input
        value={task.description}
        placeholder='Description'
        onChange={e => updateTask({ ...task, description: e.target.value })}
        className='mb-2'
      />
    </div>
  );
}

export default TaskInputs
