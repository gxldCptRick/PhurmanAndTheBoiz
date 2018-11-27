import React, { Component } from "react";
import Line from "../../models/Line";
import * as RethinkAPI from '../../rethinkAPI';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.isDrawing = false;
    this.drawingFromDB = true;
    this.currentLineId = null;

    RethinkAPI.subscribeToMessageFromServer((uuid) => {
      this.currentLineId = uuid;
    })

    RethinkAPI.subscribeToPointDraw((line) => {
      this.drawLine(line);
    })
  }

  drawLine(line){
    if (line === null)
      return;
    if (line.points.length < 1){
      return;
    }

    if (!this.isDrawing){
      let arrayLength = line.points.length;
      let ctx = this.drawingCanvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      for(let i = 1; i < arrayLength; i++){
        ctx.lineTo(line.points[i].x, line.points[i].y);
        ctx.stroke();
      }
    }
  }

  clearDrawing() {
    this.lines = [];
    this.currentLine = undefined;
    let ctx = this.drawingCanvas.getContext("2d");
    ctx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
  }

  startDrawing(event) {
    this.isDrawing = true;
    let ctx = this.drawingCanvas.getContext("2d");
    let point = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.moveTo(point.x, point.y);
    let newLine = new Line();
    newLine.setId(this.currentLineId);
    RethinkAPI.sendLine({ newLine });
  };

  finishDrawing() {
    this.isDrawing = false;
  }

  drawingOnTheCanvas(event) {
    if (this.isDrawing) {
      this.updateCanvas({
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY
      });
    }
  }

  updateCanvas({ x, y }) {
    if (this.isDrawing) {
      let ctx = this.drawingCanvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.lineTo(x, y);
      ctx.stroke();
      let lineId = this.currentLineId;
      RethinkAPI.sendPointToDraw({x, y, lineId});
    }
  }

  render() {
    return (
      <div>
        <canvas
          ref={c => (this.drawingCanvas = c)}
          onMouseMove={event => this.drawingOnTheCanvas(event)}
          onMouseDown={event => this.startDrawing(event)}
          onMouseUp={event => this.finishDrawing(event)}
          onMouseLeave={event => this.finishDrawing(event)}
          style={this.props.style}
          width="900px"
          height="500px"
        />
        <button type="button" onClick={_ => this.clearDrawing()}>
          Clear
        </button>
        <button type="button" onClick={_ => this.reDrawLines()}>
          ReDraw
        </button>
      </div>
    );
  }
}

export default Canvas;
