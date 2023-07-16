import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ largeImageURL, tags, webformatURL }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = e => {
    setIsOpenModal(true);
  };

  return (
    <>
      <img
        onClick={openModal}
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryIteImage}
      />
      {isOpenModal && (
        <Modal onClose={setIsOpenModal}>
          <img className={css.ModalImg} src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
