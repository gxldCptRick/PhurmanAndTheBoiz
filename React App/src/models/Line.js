// @flow
class Line {
  constructor() {
    this.points = [];
  }
  addPoint(point: { x: number, y: number }) {
    this.points.push(point);
  }
}

export default Line;
