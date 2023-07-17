import React from 'react';
import PropTypes from 'prop-types';
import { StyledImageGalleryItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  webformatURL,
  onOpenModal,
  largeImageURL,
  tags,
}) => {
  return (
    <StyledImageGalleryItem className="ImageGalleryItem">
      <img
        loading="lazy"
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={() => onOpenModal({ largeImageURL, tags })}
      />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
