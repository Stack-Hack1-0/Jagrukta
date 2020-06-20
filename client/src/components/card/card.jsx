import React from 'react';

import './card.css';

export const Card = (props) => {
    return <div className='card-container'>
        <h2>{props.news.name}</h2>
        <p>{props.news.address.zipcode}</p>
        </div>
}