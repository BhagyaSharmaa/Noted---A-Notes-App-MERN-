// src/components/NotesList.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

function NotesList({ notes, categories }) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  // Filter notes based on selected category
  const filteredNotes = selectedCategoryFilter
    ? notes.filter(note => note.category === selectedCategoryFilter)
    : notes;

  return (
    <div>
      <h2>Notes</h2>
      
      {/* Category Filter */}
      <select
        value={selectedCategoryFilter}
        onChange={(e) => setSelectedCategoryFilter(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Notes Display */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {filteredNotes.map((note) => (
          <div key={note.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            width: '200px'
          }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>Category: {note.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      category: PropTypes.string.isRequired
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default NotesList;
