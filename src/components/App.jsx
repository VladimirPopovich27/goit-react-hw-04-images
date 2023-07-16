import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { getImages } from 'components/API';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [image, setImage] = useState('');
  const [hits, setHits] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 12;

  useEffect(() => {
    if (!image) {
      return;
    }
    const fetchImages = async image => {
      await setStatus(STATUS.PENDING);
      try {
        const data = await getImages({ image, perPage, currentPage });
        if (data.hits.length === 0) {
          throw Error(`No matches found with "${image}"`);
        }
        setHits(prevHits => [...prevHits, ...data.hits]);
        setTotalPages(Math.ceil(data.total / perPage));
        setStatus(STATUS.RESOLVED);
      } catch (error) {
        setError(error.message);
        setStatus(STATUS.REJECTED);
      }
    };

    fetchImages(image, currentPage);
  }, [image, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const handelFormSubmit = image => {
    setImage(image);
    setCurrentPage(1);
    setHits([]);
  };

  const showLoadMoreButton = hits.legth !== 0 && currentPage < totalPages;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handelFormSubmit} />

      {status === STATUS.IDLE && (
        <h2 className={css.Request}>Please enter what you looking for</h2>
      )}

      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.REJECTED && (
        <h1 className={css.ErrorTitle}>{error}</h1>
      )}
      {hits.length > 0 && <ImageGallery hits={hits} />}

      {showLoadMoreButton && (
        <Button
          handleLoadMore={handleLoadMore}
          status={status}
          pendingStatus={STATUS.PENDING}
          disabled={status === STATUS.PENDING ? true : false}
        />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
