const BOARD_SQUARES = 6; // must match --board-squares in globals.css

export default function Board() {
  return (
    <div className={`board board-${BOARD_SQUARES}`}>
      {Array.from({ length: BOARD_SQUARES * BOARD_SQUARES }, (_, i) => {
        const row = Math.floor(i / BOARD_SQUARES);
        const col = i % BOARD_SQUARES;
        const isLight = (row + col) % 2 === 0;
        return (
          <div key={i} className={isLight ? "bg-square-light" : "bg-square-dark"} />
        );
      })}
    </div>
  );
}
