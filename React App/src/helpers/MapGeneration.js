import Map from "../models/Map";
const offset = 50;
const sides = { top: 0, bottom: 2, right: 1, left: 3 };
const minDistanceFromSide = 25;
function isRectangleInsideOtherRectangle(rect1, rect2) {
  return (
    rect2.left >= rect1.left &&
    rect2.right <= rect1.right &&
    rect2.top >= rect1.top &&
    rect2.bottom <= rect1.bottom
  );
}

function isRectangleIntersectingWithRoom(r1, r2) {
  return (
    r1.left <= r2.right &&
    r1.right >= r2.left &&
    r1.top <= r2.bottom &&
    r1.bottom >= r2.top
  );
}

function isOverlapping(room, rooms) {
  let r2 = room;
  let isOverlapping = false;
  rooms.some(function(r1) {
    console.log(r1);
    let isContained = isRectangleInsideOtherRectangle(r1, r2) || isRectangleInsideOtherRectangle(r2, r1);
    if (isRectangleIntersectingWithRoom(r1, r2) || isContained) {
      isOverlapping = true;
    }
    return !isOverlapping;
  });
  return isOverlapping;
}

function generateRoomSize() {
  return (Math.floor(Math.random() * 4) + 3) * 25;
}

function generateRoomPosition(positionOffset) {
  return (Math.floor(Math.random() * positionOffset) + 3) * 25;
}

function generateSize(roomYPoint, upperBound) {
  let roomHeight = generateRoomSize();
  let tooTall = roomYPoint + roomHeight >= upperBound;
  while (tooTall) {
    roomHeight = generateRoomSize();
    tooTall = roomYPoint + roomHeight >= upperBound;
  }
  return roomHeight;
}

function generateNewRoom() {
  let roomYPoint = generateRoomPosition(12);
  let roomXPoint = generateRoomPosition(28);
  let roomHeight = generateSize(roomXPoint, 850);
  let roomWidth = generateSize(roomYPoint, 450);
  return {
    x: roomXPoint,
    y: roomYPoint,
    width: roomWidth,
    height: roomHeight,
    left: roomXPoint,
    right: roomXPoint + roomWidth,
    top: roomYPoint,
    bottom: roomYPoint + roomHeight
  };
}

function countPossibleDoorsForGivenPair(newRoom, sideOne, sideTwo, prop) {
  let maxDoorCount = 1;
  if (newRoom[sideOne] - offset > minDistanceFromSide) {
    if (newRoom[prop] === 150) {
      maxDoorCount += 1;
    }
  }
  if (newRoom[sideTwo] + offset < 475) {
    maxDoorCount += 1;
    if (newRoom[prop] === 150) {
      maxDoorCount += 1;
    }
  }
  return maxDoorCount;
}

function calculateMaxDoorCount(newRoom) {
  let maxDoorCount = 0;
  maxDoorCount += countPossibleDoorsForGivenPair(
    newRoom,
    "top",
    "bottom",
    "width"
  );
  maxDoorCount += countPossibleDoorsForGivenPair(
    newRoom,
    "left",
    "right",
    "height"
  );
  if (maxDoorCount === 0) maxDoorCount = 1;
  return maxDoorCount;
}

function generateDoorCount(maxDoorCount, roomCount, currentRoom) {
  let currentDoorCount = 0;
  let doorCount = Math.floor(Math.random() * (roomCount - 1)) + 1;
  if (currentRoom === roomCount - 1) {
    let isEven = currentDoorCount + (doorCount % 2) === 0;
    do {
      doorCount = Math.floor(Math.random() * (roomCount - 1)) + 1;
      if (doorCount > maxDoorCount) {
        doorCount = maxDoorCount;
      }
      isEven = currentDoorCount + (doorCount % 2) === 0;
    } while (!isEven);
  } else if (doorCount > maxDoorCount) {
    doorCount = maxDoorCount;
  }

  return doorCount;
}

function sideIsCorrectlyOffset(side, room) {
  if (side < sides.top || side > sides.left)
    throw new Error("Side must be between [0,3] inclusive.");
  let isOffsetCorrectly = false,
    sideToUse = null;
  if (side > sides.top && side < sides.left) {
    let maxSize = 475;
    sideToUse = "bottom";
    if (side === sides.right) {
      maxSize += 200;
      sideToUse = "right";
    }
    isOffsetCorrectly = room[sideToUse] + offset < maxSize;
  } else {
    sideToUse = side === sides.top ? "top" : "left";
    isOffsetCorrectly = room[sideToUse] - offset > minDistanceFromSide;
  }
  return isOffsetCorrectly;
}

function generateDoor(name, room, { startOffset, endOffset, axis, mod }) {
  mod = mod || 25;
  startOffset = startOffset || 25;
  endOffset = endOffset || startOffset + mod;
  axis = axis || "y";
  return {
    door: name,
    startPoint: room[axis] + startOffset,
    endPoint: room[axis] + endOffset,
    axis: axis,
    connected: false
  };
}

function generateDoorBasedOnSize({
  size,
  name,
  room,
  axis,
  startOffset,
  endOffset,
  mod
}) {
  axis = axis || "y";
  let door = null;
  let basicDoor = generateDoor(name, room, { axis, startOffset, mod });
  let uberDoor = generateDoor(name, room, {
    axis,
    startOffset: startOffset + mod,
    mod
  });
  if (size % 3 === 0) {
    door = basicDoor;
  } else if (size === 4) {
    if (Math.floor(Math.random() * 100) % 2 === 0) door = basicDoor;
    else door = uberDoor;
  } else if (size === 5) door = uberDoor;
  else throw new Error("Size must be betwen 3 and 6.");
  return door;
}

function drawNewestRoom(rooms, roomCount, currentRoom) {
  let newRoom = generateNewRoom();
  while (isOverlapping(newRoom, rooms)) {
    newRoom = generateNewRoom();
  }
  let maxDoorCount = calculateMaxDoorCount(newRoom);
  let getTotalPossibleDoors = generateDoorCount(
    maxDoorCount,
    roomCount,
    currentRoom
  );
  let takenDoors = [];
  //0 = top, 1 = right, 2 = bottom, 3 = left
  for (let i = 0; i < 4 && getTotalPossibleDoors > 0; i++) {
    if (sideIsCorrectlyOffset(i, newRoom)) {
      let amountUsed = 0;
      let doorChance = Math.floor(Math.random() * 100);
      if (doorChance > 50) {
        amountUsed++;
        takenDoors.push(`${i}0`);
        doorChance = Math.floor(Math.random() * 100);
        let size = i === sides.top || i === sides.bottom ? "width" : "height";
        if (newRoom[size] === 150 && doorChance > 50) {
          amountUsed++;
          takenDoors.push(`${i}1`);
        }
      }
      getTotalPossibleDoors -= amountUsed;
    }
  }
  var doorPoints = [];
  let adjustedWidth = newRoom.width / 25;
  let adjustedHeight = newRoom.height / 25;
  if (takenDoors.includes("00")) {
    doorPoints.push(
      generateDoorBasedOnSize({
        name: "00",
        size: adjustedWidth,
        room: newRoom,
        axis: "x"
      })
    );
  }
  if (takenDoors.includes("01")) {
    doorPoints.push(
      generateDoor("01", newRoom, {
        startOffset: newRoom.width - 50,
        axis: "x"
      })
    );
  }
  if (takenDoors.includes("10")) {
    doorPoints.push(
      generateDoorBasedOnSize({
        name: "10",
        size: adjustedHeight,
        room: newRoom
      })
    );
  }
  if (takenDoors.includes("11")) {
    doorPoints.push(
      generateDoor("11", newRoom, { startOffset: newRoom.height - 50 })
    );
  }
  if (takenDoors.includes("20")) {
    doorPoints.push(
      generateDoorBasedOnSize({
        name: "20",
        room: newRoom,
        size: adjustedWidth,
        startOffset: newRoom.width - 25,
        axis: "x",
        mod: -25
      })
    );
  }
  if (takenDoors.includes("21")) {
    doorPoints.push(
      generateDoor("21", newRoom, { startOffset: 50, mod: -25, axis: "x" })
    );
  }
  if (takenDoors.includes("30")) {
    doorPoints.push(
      generateDoorBasedOnSize({
        name: "30",
        room: newRoom,
        size: adjustedWidth,
        startOffset: newRoom.height - 25,
        mod: -25
      })
    );
  }
  if (takenDoors.includes("31")) {
    doorPoints.push(generateDoor("31", newRoom, { startOffset: 50, mod: -25 }));
  }

  var returnRoom = {
    ...newRoom,
    doorPoints: doorPoints,
    doorCount: getTotalPossibleDoors,
    connectedDoors: 0
  };

  return returnRoom;
}

function connectRooms(rooms) {}

export function generateMap() {
  let roomCount = Math.floor(Math.random() * 5) + 3;
  let rooms = [];
  for (let i = 0; i < roomCount; i++) {
    let newRoom = drawNewestRoom(rooms, roomCount, i);
    rooms.push(newRoom);
  }
  connectRooms(rooms);
  return new Map(rooms);
}
