import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Game = ({ player, score, addScore }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [question0, setQuestion0] = useState();
  const [question1, setQuestion1] = useState();
  const [question2, setQuestion2] = useState();
  const [clicked0, setClicked0] = useState(false);
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  
  
  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch('http://localhost:5000/game');
      const data = await response.json();
      const questionList = data.results.map((item, i) => item = {'id': i, 'question': item.question, 'correct': item.correct_answer, 'wrong': item.incorrect_answers})
      setQuestion0(questionList[0]);
      setQuestion1(questionList[1]);
      setQuestion2(questionList[2]);

      setIsLoading(false);
    }
    getQuestions();
  }, [])
  
  console.log(question0);

  if (isLoading) {
    return <>Loading...</>
  }

  const handleClick = e => {
    switch(e.target.id) {
      case '0': 
        if (e.target.innerHTML === question0.correct) {
          e.target.parentElement.classList.add('correct');
          addScore(100);
        }
        else {
          e.target.parentElement.classList.add('wrong');
        }
        setClicked0(true);
        break;
      case '1': 
        if (e.target.innerHTML === question1.correct) {
          e.target.parentElement.classList.add('correct');
          addScore(100);
        }
        else {
          e.target.parentElement.classList.add('wrong');
        }
        setClicked1(true);
        break;
      case '2': 
        if (e.target.innerHTML === question2.correct) {
          e.target.parentElement.classList.add('correct');
          addScore(100);
        }
        else {
          e.target.parentElement.classList.add('wrong');
        }
        setClicked2(true);
        break;
      default:
        break;
    }
  }

  const createRandomAnswers = (question) => {
    const allAnswers = [...question.wrong, question.correct];
    const randomizedAnswers = [];
    while(allAnswers.length > 0) {
      const randomIndex = Math.floor(Math.random() * allAnswers.length);
      randomizedAnswers.push(allAnswers[randomIndex]);
      allAnswers.splice(randomIndex, 1);
    }
    return randomizedAnswers;
  }

  const randomAnswers0 = createRandomAnswers(question0);
  const randomAnswers1 = createRandomAnswers(question1);
  const randomAnswers2 = createRandomAnswers(question2);

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
      <div className='username'>{player.username}: <span className='score'>{score}</span></div>
      <div className='question-container'>
        <div className='card'>
          <div className='card__question'>{question0.question.replace(/(&#039;)/g, '')}</div>
          {randomAnswers0.map((a, i) => <button id='0' onClick={!clicked0 ? handleClick : null} className='card__answer' key={i}>{a}</button>)}
        </div>
        <div className='card'>
          <div className='card__question'>{question1.question.replace(/(&#039;)/g, '')}</div>
          {randomAnswers1.map((a, i) => <button id='1' onClick={!clicked1 ? handleClick : null} className='card__answer' key={i}>{a}</button>)}
        </div>
        <div className='card'>
          <div className='card__question'>{question2.question.replace(/(&#039;)/g, '')}</div>
          {randomAnswers2.map((a, i) => <button id='2' onClick={!clicked2 ? handleClick : null} className='card__answer' key={i}>{a}</button>)}
        </div>
      </div>
      <Link to={'/result'} onClick={handleSave} className='link' >See results</Link>
    </>
  )
}

export default Game