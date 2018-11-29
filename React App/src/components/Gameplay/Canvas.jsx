import React, { Component } from "react";
import Line from "../../models/Line";
import * as RethinkAPI from "../../rethinkAPI";

class Canvas extends Component {
  constructor(props) {
    super(props);
    console.log(props);
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

  willOverlap(room, rooms) {
    var r2 = room;

    var isInside = function(rect1, rect2) {
      return(rect2.left >= rect1.left && rect2.right <= rect1.right && rect2.top >= rect1.top && rect2.bottom <= rect1.bottom);
    }

    var isOverlapping = false;
    for (var i = 0; i < rooms.length; i++) {
      var r1 = rooms[i];

      var isIntersecting = !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
      var isContained = isInside(r1, r2) || isInside(r2, r1);

      if (isIntersecting || isContained) {
        isOverlapping = true;
      }
    }

    return(isOverlapping);
  }

  generateRoom(rooms) {
    var roomWidth = (Math.floor(Math.random() * 4) + 3) * 25;
    var roomHeight = (Math.floor(Math.random() * 4) + 3) * 25;
    var roomYPoint = (Math.floor(Math.random() * 14) + 1) * 25;
    var roomXPoint = (Math.floor(Math.random() * 30) + 1) * 25;

    var tooTall = true;
    var tooWide = true;

    while (tooTall) {
      if ((roomYPoint + roomHeight) >= 450) {
        roomHeight = (Math.floor(Math.random() * 4) + 3) * 25;
      } else {
        tooTall = false;
      }
    }

    while (tooWide) {
      if ((roomXPoint + roomWidth) >= 850) {
        roomWidth = (Math.floor(Math.random() * 4) + 3) * 25;
      } else {
        tooWide = false;
      }
    }

    var newRoom = {left:roomXPoint,right:roomXPoint + roomWidth,top:roomYPoint,bottom:roomYPoint + roomHeight};

    while (this.willOverlap(newRoom, rooms)) {
      roomWidth = (Math.floor(Math.random() * 4) + 3) * 25;
      roomHeight = (Math.floor(Math.random() * 4) + 3) * 25;
      roomXPoint = (Math.floor(Math.random() * 30) + 1) * 25;
      roomYPoint = (Math.floor(Math.random() * 14) + 1) * 25;
  
      tooTall = true;
      tooWide = true;
  
      while (tooTall) {
        if ((roomYPoint + roomHeight) >= 450) {
          roomHeight = (Math.floor(Math.random() * 4) + 3) * 25;
        } else {
          tooTall = false;
        }
      }
  
      while (tooWide) {
        if ((roomXPoint + roomWidth) >= 850) {
          roomWidth = (Math.floor(Math.random() * 4) + 3) * 25;
        } else {
          tooWide = false;
        }
      }

      newRoom = {left:roomXPoint,right:roomXPoint + roomWidth,top:roomYPoint,bottom:roomYPoint + roomHeight};
    }

    let ctx = this.drawingCanvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(roomXPoint, roomYPoint, roomWidth, roomHeight);
    ctx.stroke();

    return newRoom;
  }

  connectRooms() {

  }

  generateMap() {
    this.clearDrawing();
    let ctx = this.drawingCanvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(25, 25, 850, 450);
    ctx.stroke();

    var roomCount = Math.floor(Math.random() * 5) + 3;
    var rooms = [];
    var i;
    for (i = 0; i < roomCount; i++) {
      var newRoom = this.generateRoom(rooms);
      rooms.push(newRoom);
    }

    this.connectRooms();
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
        <button type="button" onClick={_ => this.generateMap()}>
          Generate Map
        </button>
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
