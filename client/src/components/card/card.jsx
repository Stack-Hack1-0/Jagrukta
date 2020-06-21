import React from 'react';

import './card.css';

export const Card = (props) => {
    return <div className='card-container'>
        <h2>{props.news.data}</h2>
        <p>{props.news.createdAt}</p>
        </div>
}