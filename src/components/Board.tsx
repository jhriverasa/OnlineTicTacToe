import { BoardConst } from "../utils";

const Board = ({ boardState, onChangeBoardState }) => {
  const handleClickGame = (cell) => {
    onChangeBoardState(cell);
  };

  const getImageFromCellState = (cellState) => {
    if (cellState === BoardConst.x) return "./assets/game/x.png";
    if (cellState === BoardConst.o) return "./assets/game/o.png";
    if (cellState === BoardConst.blank) return "./assets/game/blank.png";
  };

  return (
    <div className="flex flex-col w-full p-12 items-center">
      <div className="flex">
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(0)}
        >
          <div>
            <img src={getImageFromCellState(boardState[0])}></img>
          </div>
        </div>
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(1)}
        >
          <div>
            <img src={getImageFromCellState(boardState[1])}></img>
          </div>
        </div>
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(2)}
        >
          <div>
            <img src={getImageFromCellState(boardState[2])}></img>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(3)}
        >
          <div>
            <img src={getImageFromCellState(boardState[3])}></img>
          </div>
        </div>
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(4)}
        >
          <div>
            <img src={getImageFromCellState(boardState[4])}></img>
          </div>
        </div>
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(5)}
        >
          <div>
            <img src={getImageFromCellState(boardState[5])}></img>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(6)}
        >
          <div>
            <img src={getImageFromCellState(boardState[6])}></img>
          </div>
        </div>
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(7)}
        >
          <div>
            <img src={getImageFromCellState(boardState[7])}></img>
          </div>
        </div>
        <div
          className="p-6 border border-white"
          onClick={() => handleClickGame(8)}
        >
          <div>
            <img src={getImageFromCellState(boardState[8])}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
