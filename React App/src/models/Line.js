// @flow
export default class Line {
  constructor() {
    this.points = [];
    this.id = null;
  }
  addPoint(point: { x: number, y: number }) {
    this.points.push(point);
  }

  setId(id){
    this.id = id;
  }
}