import React from "react";
import Die from "./components/die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  function generateAllDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const [dice, setDice] = React.useState(generateAllDice());

  const gamWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      id={dieObj.id}
      Hold={Hold}
    />
  ));

  function rollDice() {
    if (gamWon) {
      setDice(generateAllDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((dice) =>
          dice.isHeld === true
            ? dice
            : { ...dice, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
  }

  function Hold(id) {
    setDice((oldDice) => {
      return oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }
  return (
    <div
      className="max-w-[700px] h-screen mx-auto flex flex-col justify-center  p-4 
    bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <main className="bg-[#f3f4f6] backdrop-blur-md  mx-auto flex flex-col justify-evenly text-center border border-[#aaaaaa] h-[500px] w-full max-w-3xl rounded-xl shadow-2xl p-6 sm:p-8">
        {gamWon && <Confetti />}
        <h1 className="text-5xl font-bold tracking-tight">Tenzies</h1>
        <p className="mx-auto max-w-prose ">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="grid grid-cols-5 gap-3 sm:gap-4 mx-auto">
          {diceElements}
        </div>
        <button
          className="w-[95px]  h-[54px] mx-auto text-center border rounded-xl hover:bg-[#ab3c3c] bg-[#ac1616] text-white font-semibold shadow-lg hover:shadow-5xl  border-none  px-1
          "
          onClick={rollDice}
        >
          {gamWon ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}
