import "./Greeting.css"

//Show the user a welcome screen before the quiz starts:
function Greeting({ setIsPlaying }) {
  const handleStart = () => {
    setIsPlaying(true);
  };

  return (
    <div className='greeting'>
        <h1>Question App</h1>
        <span>Merhaba, Question App'e hoş geldin!</span> 
        <span>Bu uygulamada toplamda 10 soru ve her soru için toplam 30 saniyen olacak. İlk 10 saniye soruyu okumak için ayrıldı, kalan 20 saniyede ise soruyu cevaplaman gerek. Başlamak için "Teste Başla" butonuna tıkla ve bilgini test et. </span> 
        <span>Başarılar!</span>
        <button 
            id='start' 
            onClick={handleStart}>
            Teste Başla
        </button>
    </div>
  )
}

export default Greeting
