import './app.css';
import { questions } from '../public/questions';
import { useState, useEffect } from 'preact/hooks';
import Greeting from './components/greeting/Greeting';
import Footer from './components/footer/Footer';
import Toast from './components/toast/Toast';
import Info from './components/info/Info'
import Content from './components/content/Content';

export function App() {
  // 1-VERI AKTARIMI:
  // 1.1-veri icindeki objeleri index'ine gore takibi
  const [index, setIndex] = useState(0);
  // 1.2-questions.js dosyasindan veri aktarimi ve takibi
  const [data, setData] = useState(questions[index]);

  // 2-QUESTION APP SURECI TAKIBI:
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false); 

  // 3-SURE/SUREC ILE ILGILI TANIMLAMALAR:
  // 3.1-toplam ve kalan surenin takibi-toplamda 30 sn
  const [timeControl, setTimeControl] = useState(30); 
  // 3.2-siklarin gorunurlugunun takibi(ilk 10 sn icin)
  const [showOptions, setShowOptions] = useState(false);
  // 3.3- CARD icindeki INFO bolumunun 10(bekleme)-20(cevaplama) sn sure takibi: wait ve answer class'larinin gorunurlugunun kontrolu:
  const [showWait, setShowWait] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // 4-SIKLAR ILE ILGILI TANIMLAMALAR:
  // 4.1-siklara tiklama olayinin takibi
  const [click, setClick] = useState(false);
  // 4.2-siklarin secilebilir olup olmadiginin takibi (baslangicta secilemez olacak)
  const [select, setSelect] = useState(false); 

  // 5-SONUC BOLUMU:
  // 5.1-question app sonunda cikacak compete bolumunun takibi:
  const [showCompete, setShowCompete] = useState(false);
  // 5.2-question app sonunda cikacak toast bolumunun takibi:
  const [showToast, setShowToast] = useState(false);
  // 5.3-toast-dogru cevap takibi
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // 5.4-toast-yanlis cevap takibi
  const [wrongAnswers, setWrongAnswers] = useState(0);

  // 6-sonraki soruya gecme fonksiyonu:
  const nextQuestion = () => {
    // sonraki soruya gecildiginde; ilk anda buton tiklanamaz
    setClick(false);
    setSelect(false); 
    setTimeControl(30); //toplam sure 30 sn
    setShowOptions(false); //ilk 10 sn siklar gorunmeyecek
    setShowWait(true); //ilk 10 sn'de "lutfen bekle" mesaji gorunecek(info bolumu)
    setShowAnswer(false);//ilk 10 sn'de "cevaplayin" mesaji gorunmeyecek(info bolumu)

    //eger index soru sayisindan 1 eksik ise (hala sorulmamis soru varsa) bir sonraki soruya gec, degilse question app'i sonlandir:
    if (index < questions.length - 1) {
      setIndex(index + 1); //sonraki soruya gec
      setData(questions[index + 1]); //sonraki sounun verisini alacak sekilde data'yi setle
    } else {
      setShowToast(true); //showToast, son sorudan sonra gorunsun
      setShowCompete(true); //INFO bolumundaki showCompete, son sorudan sonra gorunsun; showWait ve showAnswer bolumleri gorunmesin
      setShowWait(false); //wait(info bolumundeki) mesajini gizle
      setShowAnswer(false);//answer(info bolumundeki) mesajini gizle
      setIsQuizFinished(true);//quiz tamamlandiya cevir
    }
  };

  // 7- index ve test bitimine bagli olarak calisacak fonksiyonlar:
  useEffect(() => {
    if (isQuizFinished) return; //quiz tamamlandiysa bisi yapma

    const waitingTime = setTimeout(() => {
      setSelect(true); //siklari secilebilir yap
      setShowWait(false);//wait(info bolumundeki) mesajini gizle
      setShowAnswer(true);//answer(info bolumundeki) mesajini goster
      setShowOptions(true); //siklari görünür hale getir
    }, 10000); //10 sn bekle

    const countdown = setInterval(() => {
      setTimeControl((prevTimer) => prevTimer - 1);
    }, 1000); //her sn sureyi 1 azalt

    // 30 sn doldugunda calisacak fonksiyon:
    const totalTime = setTimeout(() => {
      if (!isQuizFinished) {
        if (index < questions.length - 1) {
          nextQuestion(); //sure bitince sonraki soruya gec
        } else {
          setShowToast(true); // son sorunun suresi dolunca toast true olsun
          setShowCompete(true);// son sorunun suresi dolunca compete(info bolumunde) true olsun
          setShowWait(false);//wait(info bolumundeki) mesajini gizle
          setShowAnswer(false);//answer(info bolumundeki) mesajini gizle
          setIsQuizFinished(true); //test tamamlandi
        }
      }
    }, 30000);

    // sifirlamalar:
    return () => {
      clearTimeout(waitingTime);//bekleme zamanlayicisini sifirla
      clearInterval(countdown);//geri sayimi sifirla
      clearTimeout(totalTime);//tooplam sureyi sifirla
    };
  }, [index, isQuizFinished]);


  //8 - Sure 0'sa ve test bitmediyse, sonraki soruya gec fonksiyonunu calistir:
  useEffect(() => {
    if (timeControl <= 0 && !isQuizFinished) {
      nextQuestion();
    }
  }, [timeControl, isQuizFinished]);

  // 9-her yeni soru icin siklardaki 'trueLi', 'falseLi' classlarini kaldir:
  useEffect(() => {
    const list = document.querySelectorAll('li');
    list.forEach((li) => {
      li.classList.remove('trueLi', 'falseLi');
    });
  }, [data]);

  //10- test bitmediyse, henuz siklara tiklanmadiysa ve siklar secilebilir durumdaysa yapilacaklar:
  const checkLi = (event, option) => {
    if (!click && select && !isQuizFinished) {
      if (data.answer === option) {
        event.target.classList.add("trueLi");//dogru cevaba trueLi classi ekle
        setCorrectAnswers(prev => prev + 1);//dogru sayisina 1 ekle (toastta kullanilacak)
      } else {
        event.target.classList.add("falseLi");//yanlis cevaba falseLi classi ekle
        setWrongAnswers(prev => prev + 1); //yanlis sayisina 1 ekle (toastta kullanilacak)
      }
      setClick(true); //siklara tiklandi
      setSelect(false);//siklar secilemez
      setTimeout(() => {
        nextQuestion();
      }, 500); //yarim saniye icinde sonraki soruya gec
    }
  };

  // 11- TOASTBTN'A tiklandiginda test bastan baslasin:
  const handleRestart = () => {
    setIndex(0); //ilk soruya don
    setData(questions[0]); //data'yi ilk soru gelecek sekilde setle
    setClick(false);//siklara tiklanamasin
    setSelect(false);//siklar secilemez olsun
    setTimeControl(30);//toplam sureyi 30 sn olarak setle
    setShowWait(true);//wait(info) mesajini goster
    setShowAnswer(false);//answer(info) mesajini gizle
    setShowCompete(false);//compete(info) mesajini gizle
    setShowToast(false);//toast'u gizle
    setCorrectAnswers(0); //sifirla
    setWrongAnswers(0); //sifirla
    setIsQuizFinished(false); //test bitmedi olarak ayarla
    setShowOptions(false);//secenekleri ilk anda gosterme
    setIsPlaying(false);//quiz ilk basta oynamasin(giris sayfasina donuelecek, quiz'e degil)
  };

  // 
  return (
    <>
      {!isPlaying ? (

        <Greeting 
          setIsPlaying={setIsPlaying}
        />
      ) : (

        <div className="app">
          <header>
            <h1>Question App</h1>
          </header>
          
          <div className='card'>
            
            <Info 
              showWait={showWait} 
              showAnswer={showAnswer} 
              showCompete={showCompete} 
              timeControl={timeControl}
            />
            
            <Content 
              index={index}  
              data={data}  
              checkLi={checkLi}   
              showOptions={showOptions}   
            />
            
            <Toast 
              showToast={showToast}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers} 
              handleRestart={handleRestart}
              questions={questions}
            />

            <Footer 
              index={index} 
              questions={questions}
            />
          </div>

        </div>

      )}
    </>
  );
}