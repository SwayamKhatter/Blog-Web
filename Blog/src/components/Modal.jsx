// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, article, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${darkMode ? 'bg-dark-800' : 'bg-gray-800'} bg-opacity-75 z-50`}>
      <div className={`bg-white p-6 rounded-md shadow-xl max-w-lg w-full ${darkMode ? 'dark:bg-dark-2 dark:shadow-card' : ''}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-dark'}`}>{article.title}</h2>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{article.content}</p>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><strong>Author:</strong> {article.author.name}</p>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><strong>Tags:</strong> {article.tags.join(', ')}</p>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><strong>Published Date:</strong> {new Date(article.publishedDate).toLocaleDateString()}</p>
        <button
          onClick={onClose}
          className={`mt-4 px-4 py-2 ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'} rounded-md`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
