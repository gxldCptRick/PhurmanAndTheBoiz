export default class Line {
  constructor(lineId) {
    this.points = [];
    this.id = lineId;
  }
  addPoint(point: { x: number, y: number }) {
    this.points.push(point);
  }

  setId(id){
    this.id = id;
  }
}