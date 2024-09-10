import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import EditModal from './EditModal';

const ArticleContainer = (props) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = async (updatedArticle) => {
    try {
      const response = await fetch(`http://localhost:5000/api/articles/${updatedArticle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          title: updatedArticle.title,
          content: updatedArticle.content,
          tags: updatedArticle.tags,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // Notify parent component about the update
        props.onEdit(updatedArticle._id, updatedArticle.title, updatedArticle.content, updatedArticle.tags);
      } else {
        console.error('Error editing article:', result.message);
      }
    } catch (error) {
      console.error('Error editing article:', error);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`mb-10 overflow-hidden rounded-xl shadow-xl bg-[#ecf0fd] shadow-1 duration-300 hover:shadow-3 ${props.darkMode ? 'dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3' : ''}`}>
    
      {props.date && (
        <span className={`mb-5 inline-block rounded bg-primaryColor px-4 py-1 text-center text-xs font-semibold leading-loose text-white ${props.darkMode ? 'dark:bg-primaryColor' : ''}`}>
          {formatDate(props.date)}
        </span>
      )}

      <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
        <h3>
          <div
            className={`mb-4 block text-xl font-semibold ${props.darkMode ? 'text-white hover:text-primaryColor' : 'text-dark hover:text-primaryColor'} sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]`}
          >
            {props.title}
          </div>
        </h3>

        <p className={`mb-7 text-base leading-relaxed ${props.darkMode ? 'text-dark-6' : 'text-body-color'}`}>
          {props.description}
        </p>

        <p className="text-sm text-gray-500">
          <strong>Author:</strong> {props.author}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Tags:</strong> {props.tags.join(', ')}
        </p>

        <div className="flex items-center gap-2 justify-end mt-4">
          <button
            className="rounded-md border border-primaryColor bg-primaryColor p-3 text-center text-base font-medium text-white hover:bg-transparent hover:text-primaryColor transition"
            onClick={() => setEditModalOpen(true)}
          >
            <FaRegEdit />
          </button>
          <button
            className="rounded-md border border-primaryColor bg-primaryColor p-3 text-center text-base font-medium text-white hover:bg-transparent hover:text-primaryColor transition"
            onClick={() => props.onDelete(props.id)}
          >
            <MdDeleteSweep />
          </button>
        </div>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        article={{
          _id: props.id,
          title: props.title,
          content: props.description,
          tags: props.tags,
          author: { name: props.author },
          publishedDate: props.date
        }}
        onSave={handleEdit}
        darkMode={props.darkMode}
      />
    </div>
  );
};

export default ArticleContainer;
