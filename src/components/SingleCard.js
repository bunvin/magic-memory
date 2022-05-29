import './SingleCard.css'

export default function SingleCard ({cards}) {
    return (
        cards.map(card => (
        <div className='card' key={card.id}>
          <div>
            <img className='front' src={card.src} alt= "card front" />
            <img className='back' src='/img/cover.png' alt= "card back" />
          </div>
        </div>
        ))
     )
    }