import React from 'react';

import './Card.css';

const Card = props => {
  // The ${props.className} enables to add classes dynamically using props when using Card component 
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
