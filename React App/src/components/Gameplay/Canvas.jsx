import React, { Component } from "react";
import Line from "../../models/Line";
import * as RethinkAPI from "../../rethinkAPI";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.isDrawing = false;
    this.lines =
      props.lines && Array.isArray(props.lines) ? [...props.lines] : [];
    RethinkAPI.subscribeToPointDraw(point => {
      point = point || {};
      if (!this.isDrawing) {
        this.drawPoint(point, point.isBeginning);
      }
    });
  }

  clearDrawing() {
    this.lines = [];
    this.currentLine = undefined;
    let ctx = this.drawingCanvas.getContext("2d");
    ctx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
  }

  reDrawLines() {
    this.lines.forEach(line => {
      let points = line.points;
      for (let i = 0; i < points.length; i++) {
        this.drawPoint(points[i], i === 0);
      }
    });
  }

  drawPoint(point, isBeginning) {
    if (point.x && point.y) {
      let ctx = this.drawingCanvas.getContext("2d");
      if (isBeginning) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
      ctx.stroke();
    }
  }

  startDrawing(event) {
    this.isDrawing = true;
    let ctx = this.drawingCanvas.getContext("2d");
    let point = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.moveTo(point.x, point.y);
    let newestLine = new Line();
    this.currentLine = newestLine;
    this.lines.push(newestLine);
    newestLine.addPoint(point);
    point.isBeginning = true;
    RethinkAPI.sendPointToDraw(point);
  }

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
      ctx.lineTo(x, y);
      ctx.stroke();
      this.currentLine.addPoint({ x, y });
      RethinkAPI.sendPointToDraw({ x, y });
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
