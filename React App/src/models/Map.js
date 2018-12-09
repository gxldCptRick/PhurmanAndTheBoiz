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
            
        })
    }
}