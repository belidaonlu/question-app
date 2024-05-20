import "./Toast.css"

// quiz tamamlandığında kullanıcıya sonucu göster (doğru, yanlış, bos) ve quiz'i yeniden başlatabilmek için bir buton olsun:
function Toast({ questions, showToast, correctAnswers, wrongAnswers,  handleRestart  }) {

  const unanswered = questions.length - (correctAnswers + wrongAnswers);

  return (
    <div className={showToast ? 'toast' : 'toast hidden'}>
        <div className="toast">
            <div className="toast-title">
                Quizi tamamladın!
            </div>
            <br />
            <div className='toast-info'>
                <span>Doğru: {correctAnswers} </span>
                <span>Yanlış: {wrongAnswers} </span>
                <span>Boş: {unanswered}</span>
            </div>
            <br />
            <button 
            className='toastBtn' 
            onClick={handleRestart}>
                Giriş sayfasına dön!
            </button>
        </div>
    </div>
  )
}

export default Toast