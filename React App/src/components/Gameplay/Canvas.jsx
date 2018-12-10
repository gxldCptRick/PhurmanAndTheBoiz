import React, { Component } from "react";
import Line from "../../models/Line";
import * as RethinkAPI from "../../rethinkAPI";
import * as MapGeneration from '../../helpers/MapGeneration';
import * as CanvasRecorder from './CanvasContextRecorder';

var recordContext = null;

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.isDrawing = false;
    this.currentLineId = null;
    this.currentUser = JSON.parse(localStorage.getItem("user"));

    this.currentLineFromServer = null;
    this.firstTimeFromServer = true;
    this.lastIndexOfPointDrawn = 0;

    this.lines = [];
    this.mapCommands = [];
    this.saveLine = new Line();
    this.saveLineIndex = 0;
    
    RethinkAPI.subscribeToMessageFromServer(uuid => {
      console.log(uuid);
      this.currentLineId = uuid;
    });

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

  drawLine(line) {
    if (line === null) { this.clearDrawing(); return this.clearDrawing(); }
    else if (line.points.length < 1) return;
    else if (!this.isDrawing) {

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

      console.log("Drawing Line from server");
      let ctx = this.drawingCanvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.beginPath();  
      ctx.lineWidth = 1.5;

      ctx.moveTo(line.points[index].x, line.points[index].y);

      for(let i = (index + 1); i < arrayLength; i++){
        console.log("Drawing from server");
        console.log(this.lines);
        this.lines[lineIndex].addPoint({ x: line.points[i].x, y: line.points[i].y })
        ctx.lineTo(line.points[i].x, line.points[i].y);
        ctx.stroke();
      }

      this.lastIndexOfPointDrawn = arrayLength - 1;
    }
  }


  generateMap() {
    RethinkAPI.nukeMap();

    recordContext = new CanvasRecorder.WatchedContext(this.drawingCanvas.getContext("2d"));

    recordContext.beginPath();
    recordContext.rect(25, 25, 850, 450);
    recordContext.stroke();

    let map = MapGeneration.generateMap();
    map.draw(recordContext);

    var commands = recordContext.commands;

    RethinkAPI.sendGeneratedMapCommands({ commands });
  }

  clearDrawing() {
    console.log("Clear Called");
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
    this.lines.push(newLine);
    this.currentLine =  newLine;
    RethinkAPI.sendLine({ newLine });
    //console.log("Sent line " + newLine.id);
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
      let lineId = this.currentLine.id;
      this.currentLine.points.push({ x, y });
      RethinkAPI.sendPointToDraw({ x, y, lineId });
    }
  }

  saveToMongo(){

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
            <button type="button" onClick={_ => this.saveToMongo() }>
              Save Map
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
