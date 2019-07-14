import React from 'react'
import PropTypes from 'prop-types'
const MinusBtn = ({ onClick }) => (
  <button onClick={ onClick }>-</button>
)

MinusBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MinusBtn