import React from 'react';
import PropTypes from 'prop-types';
import { StyledBtnLoadMore } from './Button.styled';

const Button = ({ onLoadMore }) => {
  return (
    <StyledBtnLoadMore onClick={onLoadMore} className="Button">
      Load more
    </StyledBtnLoadMore>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
