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

//new game-> 
//1. double the cards
// 2. shuffle the cards (.sort)
// 3. random id for cards (.map)
// 4. reset turns state to 0
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random()  - 0.5) //w.o -0.5 won't work. neg wont shuffle pos will suffel
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

//handle a Choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}
//compare 2 selected cards 
// Choices if match/not match log to console
//added "matched" attribute to card
useEffect (() => {
  if (choiceOne && choiceTwo){
   
    if (choiceOne.src === choiceTwo.src){
      setCards(prevCards => {
        return prevCards.map(card => {   
          if (card.src === choiceOne.src){
            return {...card, matched: true}
          } else {return card}
        })
      })
      
      resetTurn()}
      else {console.log("no match")
      resetTurn()}
    }
  } , [choiceOne, choiceTwo])

  console.log(cards)
  
// reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
}

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className='card-grid'>
        {cards.map(card => (
        <SingleCard 
          key={card.id} 
          handleChoice={handleChoice}
          card={card} 
        />
        ))}
      </div>
    </div>
  );
}

export default App