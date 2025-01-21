// src/components/CategoryForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

function CategoryForm({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    
    // Check if the category already exists
    if (categories.some(category => category.name.toLowerCase() === newCategory.toLowerCase())) {
      alert('Category already exists!');
      return;
    }
    
    const newCategoryObj = {
      id: categories.length + 1,
      name: newCategory.trim()
    };
    
    setCategories([...categories, newCategoryObj]);
    setNewCategory('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add New Category</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Category Name"
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
}

// Adding propTypes validation
CategoryForm.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired, // `categories` should be an array of objects with `id` and `name` properties
  setCategories: PropTypes.func.isRequired // `setCategories` should be a function
};

export default CategoryForm;
