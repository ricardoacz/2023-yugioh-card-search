import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'; 
import axios from 'axios'

function App() {
  // Setting out updatables variable
  const [name, setName] = useState("")
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(false)

  // Functions to update stuff
  function handleChange (e) {
    setName(e.target.value)
  }

  // API request
  function handleSubmit (e) {
    e.preventDefault()
    setLoading(true)
    axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`)
      .then((response) => {
        setCard(response.data.data[0])
        setLoading(false)
      })
      .catch(err => {
        setCard(null)
        alert(err.message)
        setLoading(false)
      })
    
      setName("")

  }

  return (
    <div className="App">
      <h1>Yugioh! Search A Card</h1>
      <p>Some cards to try: Shiba-Warrior Taro, Kuriboh, Mystical Elf, United We Stand.</p>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} placeholder='Name of card' value={name}/>
        <button>Search</button>
      </form>
      <div>
        {loading && <p>Loading...</p>}
        {card && <div>
          <h2>{card.name}</h2>
          <img src={card.card_images[0].image_url}/>
          <p>{card.desc}</p>
          </div>}
        
        
      </div>
    </div>
  );
}

export default App;
