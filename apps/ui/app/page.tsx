import Board from "./components/Board";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 items-center justify-center p-8">
        <Board />
      </div>
      <div className="w-1/2"> Hi </div>
    </div>
  );
}
