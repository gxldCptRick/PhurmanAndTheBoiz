import React from "react";
import { Item } from "../models/Item";

export class Items extends React.Component {
  constructor(props) {
    super(props);
    fetch("http://localhost:60434/api/dnd/item")
    .then(response => response.json())
    .then(json => {
        this.setState({ items: [...json] });
        return json;
    })
    .then(json => console.log(json))
    .catch(err => console.error(err));
    this.state = { items: [] };
}
  render() {
    return (
      <div>
        <h1>Items</h1>
        {this.state.items.map(item => (
          <Item key={item.itemId} {...item} />
        ))}
      </div>
    );
  }
}
