import React, { Component } from "react";
import Line from "../models/Line";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.isDrawing = false;
    this.lines = props.lines && Array.isArray(props.lines)? [...props.lines]: [];
  }

  ClearDrawing(){
    let ctx = this.drawingCanvas.getContext("2d");
    ctx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
  };

  ReDrawLines() {
    let ctx = this.drawingCanvas.getContext("2d");
    this.lines.forEach(line => {
      let points = line.points;
      for (let i = 0; i < points.length; i++) {
        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
        } else {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      ctx.stroke();
    });
  };

  StartDrawing(event){
    
    this.isDrawing = true;
    let ctx = this.drawingCanvas.getContext("2d");
    let point = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.moveTo(point.x, point.y);
    let newestLine = new Line();
    this.currentLine = newestLine;
    this.lines.push(newestLine);
    newestLine.addPoint(point);
    console.log(newestLine);
    console.log(this.lines);
  };

  FinishDrawing() {
    this.isDrawing = false;
  }

  DrawingOnTheCanvas(event) {
    if(this.isDrawing){
      this.UpdateCanvas({x: event.nativeEvent.offsetX, y:event.nativeEvent.offsetY});
    }
  }

  UpdateCanvas({ x, y }) {
    if (this.isDrawing) {
      let ctx = this.drawingCanvas.getContext("2d");
      ctx.lineTo(x, y);
      if(this.counter && this.counter > 3){
        console.log(this.counter);
        ctx.stroke();
        this.counter = 0;
      }
      else {
        
        console.log(this.counter);
        if(!this.counter) this.counter = 0;
        this.counter++;
      }
      
      this.currentLine.addPoint({x, y});
    }
  }

  render() {
    return (
      <div>
        <canvas
          ref={c => (this.drawingCanvas = c)}
          onMouseMove={event => this.DrawingOnTheCanvas(event)}
          onMouseDown={event => this.StartDrawing(event)}
          onMouseUp={event => this.FinishDrawing(event)}
          onMouseLeave={event => this.FinishDrawing(event)}
          width="1000px"
          height="600px"
          style={this.props.style}
        />
        <button type="button" onClick={_ => this.ClearDrawing()}>
          Clear
        </button>
        <button type="button" onClick={_=>this.ReDrawLines()}>
          ReDraw
        </button>
      </div>
    );
  }
}

export default Canvas;
