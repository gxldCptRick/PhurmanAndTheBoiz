// @flow
export default class Line {
  constructor() {
    this.points = [];
  }
  addPoint(point: { x: number, y: number }) {
    this.points.push(point);
  }
}