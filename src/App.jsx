import React from "react"
import Die from "./components/die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  function generateAllDice(){
      return new Array(10).fill(0)
        .map(()=>({ 
          value : Math.ceil(Math.random() * 6),
          isHeld : false,
          id : nanoid()
        })
      )
    }

  const [dice, setDice] = React.useState(generateAllDice())

 
    const gamWon =  dice.every(die => die.isHeld) && 
      dice.every(die => die.value === dice[0].value)
   
  const diceElements = dice.map(dieObj=>
     <Die 
      key={dieObj.id} 
      value={dieObj.value} 
      isHeld={dieObj.isHeld} 
      id={dieObj.id}
      Hold={Hold}
     />
  )

  function rollDice(){

    if(gamWon){
      setDice(generateAllDice())
    }else{
      setDice(oldDice => oldDice.map(dice => 
      dice.isHeld === true ? dice : 
          {...dice, value : Math.ceil(Math.random() * 6) }
     ))
    }
    
  }

  function Hold(id){
    setDice(oldDice=>{
       return oldDice.map(dice=>{
          return dice.id === id ? {...dice, isHeld : !dice.isHeld} : dice
        })
    })
  }
  return (
    <main>
      {gamWon && <Confetti/>}
       <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die-container">
            {diceElements}
        </div>
          <button className="roll-dice" onClick={rollDice}>
            {gamWon? "New Game":"Roll"}</button>
    </main>
  )
}
