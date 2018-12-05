import React, { Component } from "react";
import Line from "../../models/Line";
import * as RethinkAPI from '../../rethinkAPI';

class Canvas extends Component {
  state = {
    lines: []
  }
  constructor(props) {
    super(props);
    this.isDrawing = false;
    this.currentLineId = null;

    RethinkAPI.subscribeToMessageFromServer((uuid) => {
      console.log(uuid);
      this.currentLineId = uuid;
    })

    RethinkAPI.subscribeToPointDraw((line) => {
      this.drawLine(line);
    })

    RethinkAPI.generateUUID();
  }

  drawLine(line){
    if (line === null){
      this.clearDrawing();
      return;
    }
      
    if (line.points.length < 1){
      return;
    }

    if (!this.isDrawing){
      let arrayLength = line.points.length;
      console.log("Drawing Line from server");
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

  generateRoom(rooms, roomCount) {
    var roomWidth = (Math.floor(Math.random() * 4) + 3) * 25;
    var roomHeight = (Math.floor(Math.random() * 4) + 3) * 25;
    var roomYPoint = (Math.floor(Math.random() * 12) + 3) * 25;
    var roomXPoint = (Math.floor(Math.random() * 28) + 3) * 25;

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
      roomXPoint = (Math.floor(Math.random() * 28) + 3) * 25;
      roomYPoint = (Math.floor(Math.random() * 12) + 3) * 25;
  
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

    var doorCount = Math.floor(Math.random() * (roomCount - 1)) + 1;
    var maxDoorCount = 0;

    if (!(newRoom.top - 50 <= 25)) {
      if (roomWidth == (6 * 25)) {
        maxDoorCount += 2;
      } else {
        maxDoorCount += 1;
      }
    }

    if (!(newRoom.right + 50 >= 875)) {
      if (roomHeight == (6 * 25)) {
        maxDoorCount += 2;
      } else {
        maxDoorCount += 1;
      }
    }

    if (!(newRoom.bottom + 50 >= 475)) {
      if (roomWidth == (6 * 25)) {
        maxDoorCount += 2;
      } else {
        maxDoorCount += 1;
      }
    }

    if (!(newRoom.left - 50 <= 25)) {
      if (roomHeight == (6 * 25)) {
        maxDoorCount += 2;
      } else {
        maxDoorCount += 1;
      }
    }

    if (doorCount == 0) {
      doorCount = 1;
    }

    if (doorCount > maxDoorCount) {
      doorCount = maxDoorCount;
    }

    var takenDoors = [];

    for (var i = 0; i < doorCount; i++) {
      var doorSide = Math.floor(Math.random() * 4); //0 = top, 1 = right, 2 = bottom, 3 = left
      var validSide = true;

      do {
        switch (doorSide) {
          case 0:

            if (newRoom.top - 50 <= 25) {
              validSide = false;
              doorSide = Math.floor(Math.random() * 4);
            } else {
              validSide = true;

              if (roomWidth == 6 * 25){
                if (takenDoors.includes("00") && takenDoors.includes("01")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else if (takenDoors.includes("00")) {
                  takenDoors.push("01");
                } else if (takenDoors.includes("01")) {
                  takenDoors.push("00");
                } else {
                  var door = Math.floor(Math.random() * 2);

                  if (door == 0){
                    takenDoors.push("00");
                  } else {
                    takenDoors.push("01");
                  }
                }
              } else {
                if (takenDoors.includes("00")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else {
                  takenDoors.push("00");
                }
              }
            }

            break;

          case 1:

            if (newRoom.right + 50 >= 875) {
              validSide = false;
              doorSide = Math.floor(Math.random() * 4);
            } else {
              validSide = true;

              if (roomHeight == 6 * 25){
                if (takenDoors.includes("10") && takenDoors.includes("11")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else if (takenDoors.includes("10")) {
                  takenDoors.push("11");
                } else if (takenDoors.includes("11")) {
                  takenDoors.push("10");
                } else {
                  var door = Math.floor(Math.random() * 2);

                  if (door == 0){
                    takenDoors.push("10");
                  } else {
                    takenDoors.push("11");
                  }
                }
              } else {
                if (takenDoors.includes("10")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else {
                  takenDoors.push("10");
                }
              }
            }

            break;

          case 2:

            if (newRoom.bottom + 50 >= 475) {
              validSide = false;
              doorSide = Math.floor(Math.random() * 4);
            } else {
              validSide = true;

              if (roomWidth == 6 * 25){
                if (takenDoors.includes("20") && takenDoors.includes("21")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else if (takenDoors.includes("20")) {
                  takenDoors.push("21");
                } else if (takenDoors.includes("21")) {
                  takenDoors.push("20");
                } else {
                  var door = Math.floor(Math.random() * 2);

                  if (door == 0){
                    takenDoors.push("20");
                  } else {
                    takenDoors.push("21");
                  }
                }
              } else {
                if (takenDoors.includes("20")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else {
                  takenDoors.push("20");
                }
              }
            }

            break;

          case 3:

            if (newRoom.left - 50 <= 25) {
              validSide = false;
              doorSide = Math.floor(Math.random() * 4);
            } else {
              validSide = true;

              if (roomHeight == 6 * 25){
                if (takenDoors.includes("30") && takenDoors.includes("31")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else if (takenDoors.includes("30")) {
                  takenDoors.push("31");
                } else if (takenDoors.includes("31")) {
                  takenDoors.push("30");
                } else {
                  var door = Math.floor(Math.random() * 2);

                  if (door == 0){
                    takenDoors.push("30");
                  } else {
                    takenDoors.push("31");
                  }
                }
              } else {
                if (takenDoors.includes("30")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else {
                  takenDoors.push("30");
                }
              }
            }

            break;

          default:

            throw "Unreachable Code: Door is generated on a non-existant side!";
        }
      } while(!validSide);
    }

    let ctx = this.drawingCanvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(roomXPoint, roomYPoint);


    ctx.lineTo(roomXPoint + 25, roomYPoint);
    ctx.moveTo(roomXPoint + 50, roomYPoint);

    if (takenDoors.includes("00")) {
      switch (roomWidth / 25) {

        case 3, 6:

          ctx.lineTo(roomXPoint + 25, roomYPoint);
          ctx.moveTo(roomXPoint + 50, roomYPoint);

          break;

        case 4:

          if (Math.floor(Math.random() * 2) == 0) {
            ctx.lineTo(roomXPoint + 25, roomYPoint);
            ctx.moveTo(roomXPoint + 50, roomYPoint);
          } else {
            ctx.lineTo(roomXPoint + 50, roomYPoint);
            ctx.moveTo(roomXPoint + 75, roomYPoint);
          }

          break;

        case 5:

          ctx.lineTo(roomXPoint + 50, roomYPoint);
          ctx.moveTo(roomXPoint + 75, roomYPoint);

          break;
      }
    }

    if (takenDoors.includes("01")) {
      ctx.lineTo(roomXPoint + roomWidth - 50, roomYPoint);
      ctx.moveTo(roomXPoint + roomWidth - 25, roomYPoint);
    }

    ctx.lineTo(roomXPoint + roomWidth, roomYPoint);

    if (takenDoors.includes("10")) {
      switch (roomHeight / 25) {

        case 3, 6:

          ctx.lineTo(roomXPoint + roomWidth, roomYPoint + 25);
          ctx.moveTo(roomXPoint + roomWidth, roomYPoint + 50);

          break;

        case 4:

          if (Math.floor(Math.random() * 2) == 0) {
            ctx.lineTo(roomXPoint + roomWidth, roomYPoint + 25);
            ctx.moveTo(roomXPoint + roomWidth, roomYPoint + 50);
          } else {
            ctx.lineTo(roomXPoint + roomWidth, roomYPoint + 50);
            ctx.moveTo(roomXPoint + roomWidth, roomYPoint + 75);
          }

          break;

        case 5:

          ctx.lineTo(roomXPoint + roomWidth, roomYPoint + 50);
          ctx.moveTo(roomXPoint + roomWidth, roomYPoint + 75);

          break;
      }
    }

    if (takenDoors.includes("11")) {
      ctx.lineTo(roomXPoint + roomWidth, roomYPoint + roomHeight - 50);
      ctx.moveTo(roomXPoint + roomWidth, roomYPoint + roomHeight - 25);
    }

    ctx.lineTo(roomXPoint + roomWidth, roomYPoint + roomHeight);

    if (takenDoors.includes("20")) {
      switch (roomWidth / 25) {

        case 3, 6:

          ctx.lineTo(roomXPoint + roomWidth - 25, roomYPoint + roomHeight);
          ctx.moveTo(roomXPoint + roomWidth - 50, roomYPoint + roomHeight);

          break;

        case 4:

          if (Math.floor(Math.random() * 2) == 0) {
            ctx.lineTo(roomXPoint + roomWidth - 25, roomYPoint + roomHeight);
            ctx.moveTo(roomXPoint + roomWidth - 50, roomYPoint + roomHeight);
          } else {
            ctx.lineTo(roomXPoint + roomWidth - 50, roomYPoint + roomHeight);
            ctx.moveTo(roomXPoint + roomWidth - 75, roomYPoint + roomHeight);
          }

          break;

        case 5:

          ctx.lineTo(roomXPoint + roomWidth - 50, roomYPoint + roomHeight);
          ctx.moveTo(roomXPoint + roomWidth - 75, roomYPoint + roomHeight);

          break;
      }
    }

    if (takenDoors.includes("21")) {
      ctx.lineTo(roomXPoint + 50, roomYPoint + roomHeight);
      ctx.moveTo(roomXPoint + 25, roomYPoint + roomHeight);
    }

    ctx.lineTo(roomXPoint, roomYPoint + roomHeight);

    if (takenDoors.includes("30")) {
      switch (roomWidth / 25) {

        case 3, 6:

          ctx.lineTo(roomXPoint, roomYPoint + roomHeight - 25);
          ctx.moveTo(roomXPoint, roomYPoint + roomHeight - 50);

          break;

        case 4:

          if (Math.floor(Math.random() * 2) == 0) {
            ctx.lineTo(roomXPoint, roomYPoint + roomHeight - 25);
            ctx.moveTo(roomXPoint, roomYPoint + roomHeight - 50);
          } else {
            ctx.lineTo(roomXPoint, roomYPoint + roomHeight - 50);
            ctx.moveTo(roomXPoint, roomYPoint + roomHeight - 75);
          }

          break;

        case 5:

          ctx.lineTo(roomXPoint, roomYPoint + roomHeight - 50);
          ctx.moveTo(roomXPoint, roomYPoint + roomHeight - 75);

          break;
      }
    }

    if (takenDoors.includes("31")) {
      ctx.lineTo(roomXPoint, roomYPoint + 50);
      ctx.moveTo(roomXPoint, roomYPoint + 25);
    }

    ctx.lineTo(roomXPoint, roomYPoint);
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
      var newRoom = this.generateRoom(rooms, roomCount);
      rooms.push(newRoom);
    }

    this.connectRooms();
  }

  clearDrawing() {
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
    this.state.lines.push(newLine);
    RethinkAPI.sendLine({ newLine });
    console.log("Sent line " + newLine.id);
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
      let index = this.state.lines.length - 1;
      let ctx = this.drawingCanvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.lineTo(x, y);
      ctx.stroke();
      
      let lineId = this.currentLineId;
      this.state.lines[index].points.push({x, y})
      console.log(lineId);
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
        <button type="button" onClick={_ => RethinkAPI.nukeMap()}>
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
