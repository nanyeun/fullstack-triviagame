import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Result = ({ player, score }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const response = await fetch('http://localhost:5000/results');
      const resultsList = await response.json();
      setResults(resultsList)
    }
    getResults();
  }, [])

  const handleDelete = async(id) => {
    await fetch(`http://localhost:5000/results/${id}`, {
      method: 'DELETE'
    });
    const getResults = async () => {
      const response = await fetch('http://localhost:5000/results');
      const resultsList = await response.json();
      setResults(resultsList)
    }
    getResults();
  };

  return (
    <div>
      <header>TRIVIA GAME</header>
      <h2>Result</h2>
      <div className='player'>
        <div>{player.username}</div>
        <div>{player.age}</div>
        <div>{player.nationality}</div>
        <div>{score}</div>
      </div>
        <Link to={'/edit'} className='link'>Edit your info</Link>
        <Link to={'/home'} className='link'>Play again</Link>
      <div className='results'>
        {results.map((p,i) => <div className='results__row' key={i}>
          <div>{p.username}</div>
          <div>{p.age}</div>
          <div>{p.nationality}</div>
          <div>{p.score}</div>
          {/* <button>Edit</button> */}
          <button onClick={() => handleDelete(p._id)} className='deleteBtn'>Delete</button>
          </div>)}
      </div>
    </div>
  )
}

export default Result