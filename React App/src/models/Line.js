export default class Line {
  constructor(lineId) {
    this.points = [];
    this.id = lineId;
  }
  addPoint({ x, y}) {
    this.points.push({ x, y });
  }

  setId(id){
    this.id = id;
  }
}