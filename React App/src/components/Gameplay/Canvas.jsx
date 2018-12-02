import React, { Component } from "react";
import Line from "../../models/Line";
import * as RethinkAPI from '../../rethinkAPI';

class Canvas extends Component {
  constructor(props) {
    super(props);
    console.log(props);
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
