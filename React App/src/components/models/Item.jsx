import React from 'react';

export function Item(props){
    return (<div key={props.itemId}>
        {props.itemName}
    </div>);
}