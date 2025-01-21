import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import AddTaskButton from "./AddButton";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css"; // Import Draft.js styles
import RichTextEditor from "./components/RichEditorExample";

const TaskCard = ({ index, onDeleteTask }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorStateChange = (state) => {
    setEditorState(state);
  };

  return (
    <Card
      style={{
        marginTop: "30px",
        padding: "10px",
        width: "300px",
        backgroundColor: "#98DDCA",
        textAlign: "center",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <RichTextEditor />
      <Editor
        editorState={editorState}
        onChange={handleEditorStateChange}
        placeholder="Write your task here..."
      />
      <button onClick={() => onDeleteTask(index)} style={{ marginTop: "10px" }}>
        Delete
      </button>
    </Card>
  );
};

const Notess = () => {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if token is missing
    }
  }, [navigate]);

  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      <TaskCard key={prevTasks.length} index={prevTasks.length} onDeleteTask={handleDeleteTask} />,
    ]);
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>{task}</div>
      ))}
      <AddTaskButton onAddTask={handleAddTask} />
    </div>
  );
};

Notess.propTypes = {};
TaskCard.propTypes = {
  index: PropTypes.number.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};
AddTaskButton.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default Notess;
