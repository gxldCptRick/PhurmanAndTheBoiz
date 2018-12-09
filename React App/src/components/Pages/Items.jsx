import React from "react";
import { Item } from "../models/Item";

export class Items extends React.Component {
  constructor(props) {
    super(props);
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
