import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios' // used to fetch data for web request

function App() {
  const [jokes,setJokes] = useState([]);

useEffect( ()=> {
  axios.get('/api/jokes')
  .then((response)=> {
    setJokes(response.data)
  }).catch((error)=>{
    console.log(`${error} Could not connect to required page`)
  })
},)

  return (
    <>
      <h1>Tanu and Bunny</h1>
      <p>JOKES:{jokes.length} </p>
      {
        jokes.map((joke) => ( 
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>Likes: {joke.likes}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
