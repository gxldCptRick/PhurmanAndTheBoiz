import chai from "chai";
import mocha from "mocha";
import * as MapGen from "./MapGeneration";
const should = chai.should();

describe("The Intersecting should function correctly.", function() {
  it("Should return true when it points are (0,0) (2, 2) and (1,1) (3,3)", function() {
      console.log("y")
    let rect1 = { topLeft: { x: 0, y: 2 }, bottomRight: { x: 1, y: 3 } };
    let rect2 = { topLeft: { x: 2, y: 0 }, bottomRight: { x: 3, y: 1 } };
    MapGen.isRectangleIntersectingWithRoom(rect1, rect2).should.equal(true);
  });

  it("Should return false when points are (0,2) (2,2) and (5,5) (6,4) ",function(){
    let rect1 = { topLeft: { x: 0, y: 2 }, bottomRight: { x: 5, y: 5 } };
    let rect2 = { topLeft: { x: 2, y: 0 }, bottomRight: { x: 6, y: 4 } };
    MapGen.isRectangleIntersectingWithRoom(rect1, rect2).should.equal(false);
  })
});
