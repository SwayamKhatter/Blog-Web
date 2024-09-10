import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';

const ArticleContainer = (props) => {
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

      </div>
    </div>
  );
};

export default ArticleContainer;
