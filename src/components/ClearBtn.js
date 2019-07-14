import React from 'react'
import PropTypes from 'prop-types'
const ClearBtn = ({ onClick }) => (
  <button onClick={ onClick }>C</button>
)

ClearBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ClearBtn