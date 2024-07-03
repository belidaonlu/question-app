import "./Info.css"

//Show various statuses and messages during the quiz: wait/you can answer/done.
function Info({ showWait, showAnswer, showCompete, timeControl }) {
  return (
    <div className="info">
        <div className={showWait && !showCompete ? 'wait' : 'wait hidden'}>
            <div className='loader'></div>
        </div>

        <div className={showAnswer && !showCompete ? 'answer' : 'answer hidden'}>
            <span>Soruyu cevaplamak için kalan süren: {timeControl} sn </span>
        </div>

        <div className={showCompete ? 'compete' : 'compete hidden'}>
            <span>Quizi tamamladın!</span>
        </div>
    </div>
  )
}

export default Info
