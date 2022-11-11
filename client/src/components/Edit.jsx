import React from 'react';
import { Link } from 'react-router-dom';


const Edit = ({ player, addUsername, addUserAge, addUserNationality, score }) => {
  const handleChange1 = e => {
    addUsername(e.target.value)
  };

  const handleChange2 = e => {
    addUserAge(e.target.value)
  };

  const handleChange3 = e => {
    addUserNationality(e.target.value)
  };

  const handleSave = async() => {
    await fetch('http://localhost:5000/results', {
      method: 'POST',
      body: JSON.stringify({
        username: player.username,
        age: player.age,
        nationality: player.nationality,
        score: score
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  return (
    <>
      <header>TRIVIA GAME</header>
      <div className='form'>
        <input type="text" onChange={handleChange1} value={player.username}/>
        <input type="text" onChange={handleChange2} value={player.age} />
        <input type="text" onChange={handleChange3} value={player.nationality} />
        <Link to={'/Result'} onClick={handleSave} className='link'>Back to results</Link>
      </div>
    </>
  )
}

export default Edit