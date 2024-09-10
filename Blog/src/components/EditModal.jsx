import React, { useState } from 'react';

const EditModal = ({ isOpen, onClose, article, onSave, darkMode }) => {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [tags, setTags] = useState(article.tags.join(', '));

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...article,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
    });
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${darkMode ? 'bg-dark-800' : 'bg-gray-800'} bg-opacity-75 z-50`}>
      <div className={`bg-white p-6 rounded-md shadow-xl max-w-lg w-full ${darkMode ? 'dark:bg-dark-2 dark:shadow-card' : ''}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-dark'}`}>Edit Article</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={`w-full p-2 mb-4 border ${darkMode ? 'bg-dark-3 text-white' : 'bg-white text-dark'} rounded`}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className={`w-full p-2 mb-4 border ${darkMode ? 'bg-dark-3 text-white' : 'bg-white text-dark'} rounded`}
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className={`w-full p-2 mb-4 border ${darkMode ? 'bg-dark-3 text-white' : 'bg-white text-dark'} rounded`}
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
