import { useState, useEffect } from 'react';
import './App.css'
import SingleCard from './components/SingleCard'


const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

//new game-> 
//1. double the cards
// 2. shuffle the cards (.sort)
// 3. random id for cards (.map)
// 4. reset turns state to 0
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random()  - 0.5) //w.o -0.5 won't work. neg wont shuffle pos will suffel
      .map(card => ({ ...card, id: Math.random() }))
    //restart choices befor new game
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

//handle a Choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}
//compare 2 selected cards 
useEffect (() => {
  if (choiceOne && choiceTwo){ //avoid null values
    setDisabled(true)
   
    if (choiceOne.src === choiceTwo.src){ //compare src between 2 images
      setCards(prevCards => { //pick the now finished accuring cards obj
        return prevCards.map(card => {   
          if (card.src === choiceOne.src){ //if matched
            return {...card, matched: true} //update matched to true 
          } else {return card} //keep obj
        })
      })
      resetTurn()}
      
      //delay preventing having a 3rd choice
      else {
        setTimeout(() => resetTurn(), 1000)}
      } 
  } , [choiceOne, choiceTwo])

// reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

//new game automatically
useEffect(()=>{shuffleCards()},[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className='card-grid'>
        {cards.map(card => (
        <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped= {card === choiceOne || card === choiceTwo || card.matched} //||- or
          disabled={disabled}
        />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App