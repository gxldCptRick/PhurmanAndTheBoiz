import React, { Component } from "react";
import Line from "../../models/Line";
import * as RethinkAPI from "../../rethinkAPI";
//import * as MapGeneration from '../../helpers/MapGeneration';
class Canvas extends Component {
  state = {
    lines: []
  };
  constructor(props) {
    super(props);
    this.isDrawing = false;
    this.currentLineId = null;

    RethinkAPI.subscribeToMessageFromServer(uuid => {
      console.log(uuid);
      this.currentLineId = uuid;
    });

    RethinkAPI.subscribeToPointDraw(line => {
      this.drawLine(line);
    });

    RethinkAPI.generateUUID();
  }

  drawLine(line) {
    if (line === null) return this.clearDrawing();
    else if (line.points.length < 1) return;
    else if (!this.isDrawing) {
      console.log("Drawing Line from server");
      let ctx = this.drawingCanvas.getContext("2d");
      line.forEach(function(point, index) {
        if (index === 0) {
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.moveTo(line.points[0].x, line.points[0].y);
        } else {
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      });
    }
  }
  generateMap() {
    this.clearDrawing();
    let ctx = this.drawingCanvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(25, 25, 850, 450);
    ctx.stroke();
    let roomCount = Math.floor(Math.random() * 5) + 3;
    let rooms = [];
    for (let i = 0; i < roomCount; i++) {
      let totalDoorCount = 0;
      let newRoom = this.drawNewestRoom(rooms, roomCount, i, totalDoorCount);
      rooms.push(newRoom);
      totalDoorCount += newRoom.doorCount;
    }
    this.connectRooms(rooms);
  }

  clearDrawing() {
    let ctx = this.drawingCanvas.getContext("2d");
    ctx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
  }

  startDrawing(event) {
    this.isDrawing = true;
    let ctx = this.drawingCanvas.getContext("2d");
    let newLine = new Line(this.currentLineId);
    let point = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    this.state.lines.push(newLine);
    this.state.setState({ currentLine: newLine });
    RethinkAPI.sendLine({ newLine });
    console.log("Sent line:", newLine.id);
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
      ctx.fillStyle = "#fff";
      ctx.lineTo(x, y);
      ctx.stroke();
      let lineId = this.currentLine.id;
      this.state.currentLine.points.push({ x, y });
      RethinkAPI.sendPointToDraw({ x, y, lineId });
    }
  }

  render() {
    return (
      <div>
        <div className='CanvasEdit'>
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
          <div className='CanvasButton'>
          <button type="button" onClick={_ => this.generateMap()}>
            Generate Map
          </button>
          <button type="button" onClick={_ => RethinkAPI.nukeMap()}>
            Clear
          </button>
          <button type="button" onClick={_ => this.reDrawLines()}>
            ReDraw
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
