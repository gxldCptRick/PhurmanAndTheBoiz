//  {
//     width: number,
//     height: number,
//     left: number,
//     right: number,
//     top: number,
//     bottom: number
//     x: number,
//     y: number,
//     doorPoints: [
    // {
    //     door: string,
    //     startPoint: number,
    //     endPoint: number,
    //     axis: string,
    //     connected: boolean
    //   }
//      ],
//     doorCount: number,
//     connectedDoors: number
// }

export default class Map{
    constructor(rooms){
        this.rooms = rooms;
    }

    draw(ctx){
        this.rooms.forEach(room => {
            ctx.beginPath();
            ctx.strokeStyle = "#ffffff";
            console.log(room);
            ctx.moveTo(room.topLeft.x, room.topLeft.y);
            ctx.lineTo(room.bottomRight.x, room.bottomRight.y);
            ctx.stroke();
            // room.doorPoints.forEach(door => {
            //     if(door.axis === 'x'){
            //         ctx.clearRect(door.startPoint - 5, room.y, 50, 50);
            //     }else {
            //         ctx.clearRect(room.x, door.startPoint - 5,  50, 50);
            //     }
            // })
        })
    }
}