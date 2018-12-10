import React, { Component } from "react";
import Line from "../../models/Line";
import * as RethinkAPI from '../../rethinkAPI';
//import * as BoizAPI from '../../helpers/ApiService';
import * as CanvasRecorder from './CanvasContextRecorder'

var recordContext = null;
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.isDrawing = false;
    this.currentLineId = null;

    this.currentLineFromServer = null;
    this.firstTimeFromServer = true;
    this.lastIndexOfPointDrawn = 0;

    this.lines = [];
    this.mapCommands = [];
    this.saveLine = new Line();
    this.saveLineIndex = 0;
    

    RethinkAPI.subscribeToMessageFromServer((uuid) => {
      this.currentLineId = uuid;
    })

    RethinkAPI.subscribeToPointDraw((line) => {
      if (this.firstTimeFromServer){
        this.currentLineFromServer = line.lineId;
        this.firstTimeFromServer = false;
        this.saveLine.setId(line.lineId);
        this.lines.push(this.saveLine);
      }
      this.drawLine(line);
    })

    RethinkAPI.generateUUID();

    RethinkAPI.subscribeToGeneratedMapCommands((generatedMap) => {
      this.mapCommands = [];
      //this.clearDrawing();

      if (generatedMap != null){
        this.drawGeneratedMap(generatedMap);      
        this.mapCommands = generatedMap.generatedMap;
      }
      else {
        this.clearDrawing();
      }
    })
  }

  drawGeneratedMap(generatedMap){
    let ctx = this.drawingCanvas.getContext("2d");
    let length = generatedMap.generatedMap.length;
    let command = null;
    for (var i = 0; i < length; i++){
      command = generatedMap.generatedMap[i];

      switch(command){
        case "beginPath":
        ctx.beginPath();
        break;

        case "moveTo":
        i++;
        command = generatedMap.generatedMap[i];
        ctx.moveTo(command[0], command[1]);
        break;

        case "lineTo":
        i++;
        command = generatedMap.generatedMap[i];
        ctx.lineTo(command[0], command[1]);
        break;

        case "stroke":
        ctx.stroke();
        break;

        case "rect":
        i++;
        command = generatedMap.generatedMap[i];
        ctx.rect(command[0], command[1], command[2], command[3]);
        break;

        default:
        break;
      }
      
    }
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

      
      if (line.lineId !== this.currentLineFromServer){
        this.currentLineFromServer = line.lineId;
        this.saveLine = new Line();
        this.saveLine.setId(line.lindId);
        this.lastIndexOfPointDrawn = 0;
        this.saveLineIndex++;
        this.lines.push(this.saveLine);
      }

      let index = this.lastIndexOfPointDrawn;
      let lineIndex = this.saveLineIndex;

      let arrayLength = line.points.length;
      
      
      let ctx = this.drawingCanvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.beginPath();  
      ctx.lineWidth = 1.5;

      ctx.moveTo(line.points[index].x, line.points[index].y);

      for(let i = (index + 1); i < arrayLength; i++){
        this.lines[lineIndex].addPoint({ x: line.points[i].x, y: line.points[i].y })
        ctx.lineTo(line.points[i].x, line.points[i].y);
        ctx.stroke();
      }

      this.lastIndexOfPointDrawn = arrayLength - 1;
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
      if (roomWidth === (6 * 25)) {
        maxDoorCount += 2;
      } else {
        maxDoorCount += 1;
      }
    }

    if (!(newRoom.right + 50 >= 875)) {
      if (roomHeight === (6 * 25)) {
        maxDoorCount += 2;
      } else {
        maxDoorCount += 1;
      }
    }

    if (!(newRoom.bottom + 50 >= 475)) {
      if (roomWidth === (6 * 25)) {
        maxDoorCount += 2;
      } else {
        maxDoorCount += 1;
      }
    }

    if (!(newRoom.left - 50 <= 25)) {
      if (roomHeight === (6 * 25)) {
        maxDoorCount += 2;
      } else {
        maxDoorCount += 1;
      }
    }

    if (doorCount === 0) {
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

              if (roomWidth === 6 * 25){
                if (takenDoors.includes("00") && takenDoors.includes("01")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else if (takenDoors.includes("00")) {
                  takenDoors.push("01");
                } else if (takenDoors.includes("01")) {
                  takenDoors.push("00");
                } else {
                  var door = Math.floor(Math.random() * 2);

                  if (door === 0){
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

              if (roomHeight === 6 * 25){
                if (takenDoors.includes("10") && takenDoors.includes("11")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else if (takenDoors.includes("10")) {
                  takenDoors.push("11");
                } else if (takenDoors.includes("11")) {
                  takenDoors.push("10");
                } else {
                  //var door = Math.floor(Math.random() * 2);
                  door = Math.floor(Math.random() * 2);

                  if (door === 0){
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

              if (roomWidth === 6 * 25){
                if (takenDoors.includes("20") && takenDoors.includes("21")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else if (takenDoors.includes("20")) {
                  takenDoors.push("21");
                } else if (takenDoors.includes("21")) {
                  takenDoors.push("20");
                } else {
                  //var door = Math.floor(Math.random() * 2);
                  door = Math.floor(Math.random() * 2);

                  if (door === 0){
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

              if (roomHeight === 6 * 25){
                if (takenDoors.includes("30") && takenDoors.includes("31")) {
                  validSide = false;
                  doorSide = Math.floor(Math.random() * 4);
                } else if (takenDoors.includes("30")) {
                  takenDoors.push("31");
                } else if (takenDoors.includes("31")) {
                  takenDoors.push("30");
                } else {
                  //var door = Math.floor(Math.random() * 2);
                  door = Math.floor(Math.random() * 2);

                  if (door === 0){
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
            throw new Error ("Unreachable Code: Door is generated on a non-existant side!");
        }
      } while(!validSide);
    }

    
    recordContext.beginPath();
    recordContext.moveTo(roomXPoint, roomYPoint);


    recordContext.lineTo(roomXPoint + 25, roomYPoint);
    recordContext.moveTo(roomXPoint + 50, roomYPoint);

    var doorPoints = [];

    if (takenDoors.includes("00")) {
      switch (roomWidth / 25) {

        case 3:
        case 6:
          doorPoints.push({"door" : "00", "doorStart" : roomXPoint + 25, "doorEnd" : roomXPoint + 50, "doorAxis" : "X", "connected" : false});

          recordContext.lineTo(roomXPoint + 25, roomYPoint);
          recordContext.moveTo(roomXPoint + 50, roomYPoint);

          break;

        case 4:

          if (Math.floor(Math.random() * 2) === 0) {
            doorPoints.push({"door" : "00", "doorStart" : roomXPoint + 25, "doorEnd" : roomXPoint + 50, "doorAxis" : "X", "connected" : false});

            recordContext.lineTo(roomXPoint + 25, roomYPoint);
            recordContext.moveTo(roomXPoint + 50, roomYPoint);
          } else {
            doorPoints.push({"door" : "00", "doorStart" : roomXPoint + 50, "doorEnd" : roomXPoint + 75, "doorAxis" : "X", "connected" : false});

            recordContext.lineTo(roomXPoint + 50, roomYPoint);
            recordContext.moveTo(roomXPoint + 75, roomYPoint);
          }

          break;

        case 5:

          doorPoints.push({"door" : "00", "doorStart" : roomXPoint + 50, "doorEnd" : roomXPoint + 75, "doorAxis" : "X", "connected" : false});

          recordContext.lineTo(roomXPoint + 50, roomYPoint);
          recordContext.moveTo(roomXPoint + 75, roomYPoint);

          break;

          default:
          break;
      }
    }

    if (takenDoors.includes("01")) {
      doorPoints.push({"door" : "01", "doorStart" : roomXPoint + roomWidth - 50, "doorEnd" : roomXPoint + roomWidth - 25, "doorAxis" : "X", "connected" : false});

      recordContext.lineTo(roomXPoint + roomWidth - 50, roomYPoint);
      recordContext.moveTo(roomXPoint + roomWidth - 25, roomYPoint);
    }

    recordContext.lineTo(roomXPoint + roomWidth, roomYPoint);

    if (takenDoors.includes("10")) {
      switch (roomHeight / 25) {

        case 3:
        case 6:

          doorPoints.push({"door" : "10", "doorStart" : roomYPoint + 25, "doorEnd" : roomYPoint + 50, "doorAxis" : "Y", "connected" : false});

          recordContext.lineTo(roomXPoint + roomWidth, roomYPoint + 25);
          recordContext.moveTo(roomXPoint + roomWidth, roomYPoint + 50);

          break;

        case 4:

          if (Math.floor(Math.random() * 2) === 0) {
            doorPoints.push({"door" : "10", "doorStart" : roomYPoint + 25, "doorEnd" : roomYPoint + 50, "doorAxis" : "Y", "connected" : false});

            recordContext.lineTo(roomXPoint + roomWidth, roomYPoint + 25);
            recordContext.moveTo(roomXPoint + roomWidth, roomYPoint + 50);
          } else {
            doorPoints.push({"door" : "10", "doorStart" : roomYPoint + 50, "doorEnd" : roomYPoint + 75, "doorAxis" : "Y", "connected" : false});

            recordContext.lineTo(roomXPoint + roomWidth, roomYPoint + 50);
            recordContext.moveTo(roomXPoint + roomWidth, roomYPoint + 75);
          }

          break;

        case 5:

          doorPoints.push({"door" : "10", "doorStart" : roomYPoint + 50, "doorEnd" : roomYPoint + 75, "doorAxis" : "Y", "connected" : false});

          recordContext.lineTo(roomXPoint + roomWidth, roomYPoint + 50);
          recordContext.moveTo(roomXPoint + roomWidth, roomYPoint + 75);

          break;

          default:
          break;
      }
    }

    if (takenDoors.includes("11")) {
      doorPoints.push({"door" : "11", "doorStart" : roomYPoint + roomHeight - 50, "doorEnd" : roomYPoint + roomHeight - 25, "doorAxis" : "Y", "connected" : false});

      recordContext.lineTo(roomXPoint + roomWidth, roomYPoint + roomHeight - 50);
      recordContext.moveTo(roomXPoint + roomWidth, roomYPoint + roomHeight - 25);
    }

    recordContext.lineTo(roomXPoint + roomWidth, roomYPoint + roomHeight);

    if (takenDoors.includes("20")) {
      switch (roomWidth / 25) {

        case 3:
        case 6:

         doorPoints.push({"door" : "20", "doorStart" : roomXPoint + roomWidth - 25, "doorEnd" : roomXPoint + roomWidth - 50, "doorAxis" : "X", "connected" : false});

          recordContext.lineTo(roomXPoint + roomWidth - 25, roomYPoint + roomHeight);
          recordContext.moveTo(roomXPoint + roomWidth - 50, roomYPoint + roomHeight);

          break;

        case 4:

          if (Math.floor(Math.random() * 2) === 0) {
            doorPoints.push({"door" : "20", "doorStart" : roomXPoint + roomWidth - 25, "doorEnd" : roomXPoint + roomWidth - 50, "doorAxis" : "X", "connected" : false});

            recordContext.lineTo(roomXPoint + roomWidth - 25, roomYPoint + roomHeight);
            recordContext.moveTo(roomXPoint + roomWidth - 50, roomYPoint + roomHeight);
          } else {
            doorPoints.push({"door" : "20", "doorStart" : roomXPoint + roomWidth - 50, "doorEnd" : roomXPoint + roomWidth - 75, "doorAxis" : "X", "connected" : false});

            recordContext.lineTo(roomXPoint + roomWidth - 50, roomYPoint + roomHeight);
            recordContext.moveTo(roomXPoint + roomWidth - 75, roomYPoint + roomHeight);
          }

          break;

        case 5:

        doorPoints.push({"door" : "20", "doorStart" : roomXPoint + roomWidth - 50, "doorEnd" : roomXPoint + roomWidth - 75, "doorAxis" : "X", "connected" : false});

          recordContext.lineTo(roomXPoint + roomWidth - 50, roomYPoint + roomHeight);
          recordContext.moveTo(roomXPoint + roomWidth - 75, roomYPoint + roomHeight);

          break;

          default:
          break;
      }
    }

    if (takenDoors.includes("21")) {
      doorPoints.push({"door" : "21", "doorStart" : roomXPoint + 50, "doorEnd" : roomXPoint + 25, "doorAxis" : "X", "connected" : false});

      recordContext.lineTo(roomXPoint + 50, roomYPoint + roomHeight);
      recordContext.moveTo(roomXPoint + 25, roomYPoint + roomHeight);
    }

    recordContext.lineTo(roomXPoint, roomYPoint + roomHeight);

    if (takenDoors.includes("30")) {
      switch (roomWidth / 25) {

        case 3:
        case 6:

          doorPoints.push({"door" : "30", "doorStart" : roomYPoint + roomHeight - 25, "doorEnd" : roomYPoint + roomHeight - 50, "doorAxis" : "Y", "connected" : false});

          recordContext.lineTo(roomXPoint, roomYPoint + roomHeight - 25);
          recordContext.moveTo(roomXPoint, roomYPoint + roomHeight - 50);

          break;

        case 4:

          if (Math.floor(Math.random() * 2) === 0) {
            doorPoints.push({"door" : "30", "doorStart" : roomYPoint + roomHeight - 25, "doorEnd" : roomYPoint + roomHeight - 50, "doorAxis" : "Y", "connected" : false});

            recordContext.lineTo(roomXPoint, roomYPoint + roomHeight - 25);
            recordContext.moveTo(roomXPoint, roomYPoint + roomHeight - 50);
          } else {
            doorPoints.push({"door" : "30", "doorStart" : roomYPoint + roomHeight - 50, "doorEnd" : roomYPoint + roomHeight - 75, "doorAxis" : "Y", "connected" : false});

            recordContext.lineTo(roomXPoint, roomYPoint + roomHeight - 50);
            recordContext.moveTo(roomXPoint, roomYPoint + roomHeight - 75);
          }

          break;

        case 5:

        doorPoints.push({"door" : "30", "doorStart" : roomYPoint + roomHeight - 50, "doorEnd" : roomYPoint + roomHeight - 75, "doorAxis" : "Y", "connected" : false});

          recordContext.lineTo(roomXPoint, roomYPoint + roomHeight - 50);
          recordContext.moveTo(roomXPoint, roomYPoint + roomHeight - 75);

          break;

          default:
          break;
      }
    }

    if (takenDoors.includes("31")) {
      doorPoints.push({"door" : "31", "doorStart" : roomYPoint + 50, "doorEnd" : roomYPoint + 25, "doorAxis" : "Y", "connected" : false});
      recordContext.lineTo(roomXPoint, roomYPoint + 50);
      recordContext.moveTo(roomXPoint, roomYPoint + 25);
    }

    recordContext.lineTo(roomXPoint, roomYPoint);
    recordContext.stroke();

    var returnRoom = {"top" : newRoom.top, "left" : newRoom.left, "bottom" : newRoom.bottom, "right" : newRoom.right, "doorPoints" : doorPoints, "doorCount" : doorCount, "connctedDoors" : 0};

    return returnRoom;
  }

  connectRooms() {

  }

  generateMap() {
    RethinkAPI.nukeMap();

    recordContext = new CanvasRecorder.WatchedContext(this.drawingCanvas.getContext("2d"));

    recordContext.beginPath();
    recordContext.rect(25, 25, 850, 450);
    recordContext.stroke();
    var roomCount = Math.floor(Math.random() * 5) + 3;
    var rooms = [];
    var i;
    for (i = 0; i < roomCount; i++) {
      var newRoom = this.generateRoom(rooms, roomCount);
      rooms.push(newRoom);
    }

    this.connectRooms();
    var commands = recordContext.commands;

    RethinkAPI.sendGeneratedMapCommands({ commands });
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
    RethinkAPI.sendLine({ newLine });
  }

  finishDrawing(event) {
    if (this.isDrawing){
      this.isDrawing = false;
      RethinkAPI.generateUUID();
    }
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

  saveToMongo(){
  }

  render() {
    return (
      <div>
        <input type="text" ref={name => (this.nameOfMap = name)}/>
      <div>
      </div>
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
        <button type="button" onClick={_ => { RethinkAPI.nukeMap(); this.clearDrawing()} }>
          Clear
        </button>
        <button type="button" onClick={_ => this.saveToMongo()}>
          Save Map
        </button>
      </div>
    );
  }
}

export default Canvas;