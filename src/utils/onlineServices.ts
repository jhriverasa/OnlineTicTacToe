import {
  get,
  push,
  ref,
  set,
  update,
  onValue,
  child,
  orderByValue,
  orderByChild,
  query,
  equalTo,
} from "firebase/database";
import { database } from "./rtdbservice";
import { BoardConst } from "./constants";

const createRoom = async (pass, onChangeOnlineBoard) => {
  const bl = BoardConst.blank;
  const blankBoardState = [bl, bl, bl, bl, bl, bl, bl, bl, bl];

  //create a new room with auto-generated Id
  const roomsRef = ref(database, "rooms");
  const newRoomRef = push(roomsRef);

  await set(newRoomRef, {
    pass,
    waitingForPlayer: true,
    gameState: blankBoardState,
    score: [0, 0, 0], // p1,p2,draw
  });

  const roomId = await getRoomIdfromPass(pass);

  //listen for changes
  await onValue(newRoomRef, (snapshot) => {
    const data = snapshot.exportVal();
    onChangeOnlineBoard(data);
    console.log("cambio HOST!: ", data);
  });

  return roomId;
};

const joinRoom = async (pass, onChangeOnlineBoard) => {
  const roomId = await getRoomIdfromPass(pass);
  const roomRef = ref(database, `rooms/${roomId}`);
  await update(roomRef, { waitingForPlayer: false });
  console.log("JOINED !!");



  //listen for changes
  await onValue(roomRef, (snapshot) => {
    const data = snapshot.exportVal();
    onChangeOnlineBoard(data);
    console.log("cambio JOIN!: ", data);
  });

  return roomId

};

const getRoomIdfromPass = async (pass) => {
  const roomsRef = ref(database, "rooms");
  const queryRoomByPass = query(roomsRef, orderByChild("pass"), equalTo(pass));

  let ret;
  await get(queryRoomByPass)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const valObj = snapshot.exportVal();
        console.log(Object.keys(valObj)[0]);
        ret = Object.keys(valObj)[0];
      } else {
        console.log("No data available");
        ret = "";
      }
    })
    .catch((error) => {
      console.error(error);
      return "error";
    });
  return ret;
};

const playInOnlineRoom = async (roomId, roomData) => {
  const roomRef = ref(database, `rooms/${roomId}`);
  await update(roomRef, roomData);
  console.log("done!!");
  return 0;
};

export { createRoom, joinRoom, playInOnlineRoom };
