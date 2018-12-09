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
        console.log(this.rooms);
        this.rooms.forEach(room => {
            ctx.beginPath();
            ctx.rect(room.x, room.y, room.width, room.height);
            ctx.stroke();
            room.doorPoints.forEach(door => {
                if(door.axis === 'x'){
                    ctx.clearRect(door.startPoint - 5, room.y, 15, door.endPoint - door.startPoint);
                }else {
                    ctx.clearRect(room.x, door.startPoint - 5,  door.endPoint - door.startPoint, 15);
                }
            })
        })
    }
}