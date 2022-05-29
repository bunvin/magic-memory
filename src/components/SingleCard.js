import './SingleCard.css'
//user will pick card that will turn over, 2 choices if not will cover again 

export default function SingleCard ({ card, handleChoice }) {

  const handleClick = () => {
    handleChoice(card)

  }
  
  return (      
        <div className='card'>
          <div>
            <img className='front' src={card.src} alt= "card front" />
            <img 
              className='back' 
              src='/img/cover.png' 
              alt= "card back"
              onClick = {handleClick} />
          </div>
        </div>
     )
    }