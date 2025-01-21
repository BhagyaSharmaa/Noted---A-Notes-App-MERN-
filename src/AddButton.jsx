import {} from 'react';

const AddTaskButton = ({ onAddTask }) => {
  return (
    <button style={{
   padding: "5px",
    marginLeft: "8px"
 }}onClick={onAddTask}>Add Task</button>
        
  );
}

export default AddTaskButton;
