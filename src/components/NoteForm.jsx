// src/components/NoteForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

function NoteForm({ categories, notes, setNotes }) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddNote = () => {
    if (noteTitle.trim() === '' || selectedCategory === '') {
      alert('Title and category are required!');
      return;
    }
    
    const newNote = {
      id: notes.length + 1,
      title: noteTitle,
      content: noteContent,
      category: selectedCategory
    };
    
    setNotes([...notes, newNote]);
    setNoteTitle('');
    setNoteContent('');
    setSelectedCategory('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add New Note</h2>
      <input
        type="text"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Note Title"
      />
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Note Content"
        rows="4"
        style={{ display: 'block', margin: '10px 0' }}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

NoteForm.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      category: PropTypes.string.isRequired
    })
  ).isRequired,
  setNotes: PropTypes.func.isRequired
};

export default NoteForm;
