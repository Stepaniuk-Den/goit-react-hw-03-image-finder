import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import PropTypes from 'prop-types';
import { StyledImageGallery } from './ImageGallery.styled';

const ImageGallery = ({ galleryList, onOpenModal }) => {
  const showGalleryList = Array.isArray(galleryList) && galleryList.length > 0;
  return (
    <StyledImageGallery>
      {showGalleryList &&
        galleryList.map(item => (
          <ImageGalleryItem
            key={item.id}
            webformatURL={item.webformatURL}
            largeImageURL={item.largeImageURL}
            tags={item.tags}
            onOpenModal={onOpenModal}
          />
        ))}
    </StyledImageGallery>
  );
};

ImageGallery.propTypes = {
  galleryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
