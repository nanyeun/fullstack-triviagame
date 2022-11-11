import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';
import Result from './components/Result';
import Edit from './components/Edit';

function App() {
  const [player, setPlayer] = useState({
    username: '',
    age: '',
    nationality: ''
  })
  const [score, setScore] = useState(0);

  const addUsername = (name) => {
    setPlayer(player => ({...player, username: name}))
  }

  const addUserAge = (age) => {
    setPlayer(player => ({...player, age: age}))
  }

  const addUserNationality = (nat) => {
    setPlayer(player => ({...player, nationality: nat}))
  }

  const addScore = (newScore) => {
    setScore(score + newScore)
  }

  const resetScore = () => {
    setScore(0);
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home addUsername={addUsername} addUserAge={addUserAge} addUserNationality={addUserNationality} resetScore={resetScore} player={player} />}></Route>
        <Route path='/game' element={<Game player={player} addScore={addScore} score={score} />}></Route>
        <Route path='/result' element={<Result player={player} score={score} />}></Route>
        <Route path='/edit' element={<Edit addUsername={addUsername} addUserAge={addUserAge} addUserNationality={addUserNationality} player={player} score={score} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
