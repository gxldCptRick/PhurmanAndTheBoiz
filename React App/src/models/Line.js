// @flow
export default class Line {
  constructor() {
    this.points = [];
    this.id = null;
  }
  addPoint({ x, y}) {
    this.points.push({ x, y });
    console.log("X: " + x);
    console.log("Y: " + y);
  }

  setId(id){
    this.id = id;
  }
}