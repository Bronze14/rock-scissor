import React, { useState, useEffect } from 'react';
import Lizard from '../Images/Lizard';
import Rock from '../Images/Rock';
import Paper from '../Images/Paper';
import Spock from '../Images/Spock';
import Scissors from '../Images/Scissors';
import '../Styles/FightBoard.scss';

function FightBoard({ playerOption, computerOption, winner, handleReset }) {
  const [showComputerOption, setShowComputerOption] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  useEffect(() => {
    const delay = 1000; 

    const timer1 = setTimeout(() => {
      setShowComputerOption(true);
    }, delay);

    const timer2 = setTimeout(() => {
      setShowResult(true);
      setShowPlayAgain(true);
    }, delay + 1000); // Pojawienie się wyniku i przycisku "Play Again" 1 sekundę po przycisku od komputera

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handlePlayAgainClick = () => {
    handleReset();
  };
  const renderPlayerOption = () => {
    switch (playerOption) {
        case 'Lizard':
            return Lizard;
        case 'Rock':
            return Rock;
        case 'Paper':
            return Paper;
        case 'Spock':
            return Spock;
        case 'Scissors':
            return Scissors;
        default:
            return null;
    }
    };

    const renderComputerOption = () => {
        switch (computerOption) {
            case 'Lizard':
                return Lizard;
            case 'Rock':
                return Rock;
            case 'Paper':
                return Paper;
            case 'Spock':
                return Spock;
            case 'Scissors':
                return Scissors;
            default:
                return null;
        }
    };

  return (
    <div className="Fight--Board">
      <div className='player--Block'>
        <span>YOU PICKED</span>
        <button className={`token--Fight ${playerOption} ${showResult && winner === 'YOU WIN' ? 'ripple-animation' : ''}`}>{renderPlayerOption()}</button>
      </div>
      <div className='winner--Block'>
        {showResult && (
          <>
            <div >{winner}</div>
            {showPlayAgain && <button onClick={handlePlayAgainClick}>Play Again?</button>}
          </>
        )}
      </div>
      <div className='player--Block'>
          <>
            <span>THE HOUSE PICKED</span>
            
            {showComputerOption ? (
            <button className={`token--Fight ${computerOption} ${showResult && winner === 'YOU LOSE' ? 'ripple-animation' : ''}`}>
                {renderComputerOption()}
            </button>
            ) : (
            <button className={`token--Fight--hide ${computerOption} ${showResult && winner === 'YOU LOSE' ? 'ripple-animation' : ''}`}></button>

            )}          
         </>
      </div>
    </div>
  );
}

export default FightBoard;
