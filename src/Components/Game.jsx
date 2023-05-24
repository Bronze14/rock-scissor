import React, { useState, useEffect } from 'react';
import '../Styles/Game.scss'
import Pentagon from './Pentagon'
import Rules from './Rules'
import FightBoard from './FightBoard'
const options = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];

function getRandomOption() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
function determineWinner(playerOption, computerOption) {
  // Logika porównywania wyborów i zwracania wyniku
  // ...
    if (
      (playerOption === 'Scissors' && (computerOption === 'Paper' || computerOption === 'Lizard')) ||
      (playerOption === 'Paper' && (computerOption === 'Rock' || computerOption === 'Spock')) ||
      (playerOption === 'Rock' && (computerOption === 'Scissors' || computerOption === 'Lizard')) ||
      (playerOption === 'Lizard' && (computerOption === 'Spock' || computerOption === 'Paper')) ||
      (playerOption === 'Spock' && (computerOption === 'Scissors' || computerOption === 'Rock'))
    ) {
      return 'YOU WIN';
    } else if (playerOption === computerOption) {
      return 'It\'s a tie!';
    } else {
      return 'YOU LOSE';
    }
  }

function Game() {

  const [score, setScore] = useState(() => {
    const storedScore = localStorage.getItem('score');
    return storedScore ? parseInt(storedScore, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('score', score.toString());
  }, [score]);
  const [parentPick, setParentPick] = useState(false);
  const [showRules, setShowRules] = useState(false)
  const [computerOption, setComputerOption] = useState(false);
  const [winner, setWinner] = useState('');
  useEffect(() => {
    if (parentPick && computerOption) {
      const result = determineWinner(parentPick, computerOption);
      setWinner(result);
  
      const delay = 2200; // 3 sekundy
  
      const timer = setTimeout(() => {
        if (result === 'YOU WIN') {
          setScore(score + 1);
        } else if (result === 'YOU LOSE') {
          setScore(score - 1);
        }
      }, delay);
  
      return () => {
        clearTimeout(timer);
      };
    }
  }, [parentPick, computerOption]);

  const handlePickChange = (pick) => {
    setParentPick(pick);
    setComputerOption(item=>getRandomOption())
  };


  function ShowRules(){
    setShowRules(item => !item)
  }
  function showRulesHandler() {
    setShowRules((prevShowRules) => !prevShowRules);
  }
  const handleReset = () => {
    setParentPick(false);
    setComputerOption(false);
    setWinner(false);
  };
  return (
    <div>
        <div className='score--Board'>
            <section>
                <span>ROCK</span>
                <span>PAPER</span>
                <span>SCISSORS</span>
                <span>LIZARD</span>
                <span>SPOCK</span>
            </section>
            <div>
                <p>SCORE</p>
                <span>{score}</span>
            </div>
        </div>
        {showRules ? <Rules onShowRules={showRulesHandler}/> : null}

        {!parentPick ? <Pentagon onPickChange={handlePickChange}/> : null}
        {parentPick ? 
        <FightBoard
          playerOption={parentPick}
          computerOption={computerOption}
          winner={winner}
          handleReset={handleReset}
        
        />: null}



        <button className='rules--Board' onClick={ShowRules}>
            RULES
        </button>
        
    </div>
  )
}

export default Game