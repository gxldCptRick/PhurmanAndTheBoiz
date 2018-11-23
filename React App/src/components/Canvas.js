import React from "react";
const state = { isDrawing: false };
const PrintEvent = event => console.log(event);
let drawingCanvas;

const DrawOnFuckingCanvas = ({ x, y }) => {
  if(state.isDrawing){
    let ctx = drawingCanvas.getContext("2d");
    ctx.fillStyle = "#fff"
    ctx.lineTo(x, y);
    console.log(x, y);
    ctx.stroke();
  }
  
};
function Canvas(props) {
  return (
    <canvas
      ref={c => (drawingCanvas = c)}
      onMouseMove={event =>
        DrawOnFuckingCanvas({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY })
      }
      onMouseDown={event => {
        state.isDrawing = true;
        let ctx = drawingCanvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY); 
      }}
      onMouseUp={_ => {
        state.isDrawing = false;
        console.log(state);
      }}
      style={props.style}
    />
  );
}

export default Canvas;
