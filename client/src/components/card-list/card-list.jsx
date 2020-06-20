import React from 'react';
import {Card} from '../card/card';
import './card-list.css';

export const Cardlist = props => {
    console.log(props);
    return <div className='card-list'>
        {props.news.map(x => (
            <Card key={x.id} news={x}/>
        ))}
    </div>;
};

