import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ player, addUsername, addUserAge, addUserNationality, resetScore }) => {
  resetScore();

  const handleChange1 = e => {
    addUsername(e.target.value)
  };

  const handleChange2 = e => {
    addUserAge(e.target.value)
  };

  const handleChange3 = e => {
    addUserNationality(e.target.value)
  };

  return (
    <>
      <h1>TRIVIA GAME</h1>
      <div className='form'>
        <input type="text" id="username" name="username" onChange={handleChange1} placeholder='username' />
        <input type="text" id="age" name="age" onChange={handleChange2} placeholder='age' />
        <input type="text" id="nationality" name="nationality" onChange={handleChange3} placeholder='nationality' />
        {player && <Link to={'/game'} className="link">Start playing</Link>}
      </div>
    </>
  )
}

export default Home