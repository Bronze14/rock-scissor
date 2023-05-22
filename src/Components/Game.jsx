import React,{useState} from 'react'
import '../Styles/Game.scss'
import Pentagon from './Pentagon'
import Rules from './Rules'



function Game() {

  const [score,setScore] = useState(120)
  const [parentPick, setParentPick] = useState(false);
  const [showRules, setShowRules] = useState(false)
  const handlePickChange = (pick) => {
    setParentPick(pick);
  };
  console.log(parentPick)
  function ShowRules(){
    setShowRules(item => !item)
  }
  function showRulesHandler() {
    setShowRules((prevShowRules) => !prevShowRules);
  }

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

        <Pentagon onPickChange={handlePickChange}/>




        <button className='rules--Board' onClick={ShowRules}>
            Rules
        </button>
    </div>
  )
}

export default Game