import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledModal, StyledOverlay } from './Modal.styled';

export default class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClickOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageURL, tags } = this.props.modalData;
    return (
      <StyledOverlay onClick={this.handleClickOverlay}>
        <StyledModal>
          <img src={largeImageURL} alt={tags} />
        </StyledModal>
      </StyledOverlay>
    );
  }
}

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
