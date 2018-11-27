import React from 'react';

export function Item(props){
    return (<div key={props.itemId}>
        <h2>{props.itemName}</h2>
    </div>);
}