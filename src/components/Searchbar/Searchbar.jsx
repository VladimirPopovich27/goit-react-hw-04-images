import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

export function Searchbar({ onSubmit }) {
  const [image, setImage] = useState('');
  const handelChange = e => {
    setImage(e.currentTarget.value.toLowerCase());
  };

  const handelSubmit = e => {
    e.preventDefault();
    if (image.trim() === '') {
      toast.error('Please enter the name');
      return;
    }
    onSubmit(image);
    setImage('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handelSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <FaSearch style={{ width: 24, height: 24 }} />
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
          onChange={handelChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
