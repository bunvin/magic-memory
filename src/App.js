import { useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard'


const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
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