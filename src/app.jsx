import './app.css';
import { questions } from '../public/questions';
import { useState, useEffect } from 'preact/hooks';
import Greeting from './components/greeting/Greeting';
import Footer from './components/footer/Footer';
import Toast from './components/toast/Toast';
import Info from './components/info/Info'
import Content from './components/content/Content';

export function App() {
  // 1-data transfer:
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(questions[index]);

  // 2-process tracking:
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false); 

  // 3-DEFINITIONS RELATED TO THE PROCESS:
  const [timeControl, setTimeControl] = useState(30); 
  const [showOptions, setShowOptions] = useState(false);
  const [showWait, setShowWait] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // 4-DEFINITIONS ABOUT OPTIONS:
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false); 

  // 5-FINAL PART:
  const [showCompete, setShowCompete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  // 6-Skip to next question function:
  const nextQuestion = () => {
    setClick(false);
    setSelect(false); 
    setTimeControl(30); 
    setShowOptions(false); 
    setShowWait(true);
    setShowAnswer(false);

    if (index < questions.length - 1) {
      setIndex(index + 1); 
      setData(questions[index + 1]); 
    } else {
      setShowToast(true); 
      setShowCompete(true); 
      setShowWait(false); 
      setShowAnswer(false);
      setIsQuizFinished(true);
    }
  };

  // 7- Functions that will run depending on index and test completion:
  useEffect(() => {
    if (isQuizFinished) return;

    const waitingTime = setTimeout(() => {
      setSelect(true); 
      setShowWait(false);
      setShowAnswer(true);
      setShowOptions(true);
    }, 10000); 

    const countdown = setInterval(() => {
      setTimeControl((prevTimer) => prevTimer - 1);
    }, 1000); 

    const totalTime = setTimeout(() => {
      if (!isQuizFinished) {
        if (index < questions.length - 1) {
          nextQuestion(); 
        } else {
          setShowToast(true); 
          setShowCompete(true);
          setShowWait(false);
          setShowAnswer(false);
          setIsQuizFinished(true);
        }
      }
    }, 30000);

    // resets:
    return () => {
      clearTimeout(waitingTime);
      clearInterval(countdown);
      clearTimeout(totalTime);
    };
  }, [index, isQuizFinished]);


  //8 - Running skip to next question DEPENDING ON CONDITIONS:
  useEffect(() => {
    if (timeControl <= 0 && !isQuizFinished) {
      nextQuestion();
    }
  }, [timeControl, isQuizFinished]);

  // 9-For each new question, remove the 'true', 'false' classes in the OPTIONS:
  useEffect(() => {
    const list = document.querySelectorAll('li');
    list.forEach((li) => {
      li.classList.remove('trueLi', 'falseLi');
    });
  }, [data]);

  //10- What to do if the test is not finished, OPTIONS have not been clicked yet and the options are selectable:
  const checkLi = (event, option) => {
    if (!click && select && !isQuizFinished) {
      if (data.answer === option) {
        event.target.classList.add("trueLi");
        setCorrectAnswers(prev => prev + 1);
      } else {
        event.target.classList.add("falseLi");
        setWrongAnswers(prev => prev + 1);
      }
      setClick(true);
      setSelect(false);
      setTimeout(() => {
        nextQuestion();
      }, 500);
    }
  };

  // 11- Click on TOASTBTN to start the test from the beginning:
  const handleRestart = () => {
    setIndex(0);
    setData(questions[0]);
    setClick(false);
    setSelect(false);
    setTimeControl(30);
    setShowWait(true);
    setShowAnswer(false);
    setShowCompete(false);
    setShowToast(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setIsQuizFinished(false);
    setShowOptions(false);
    setIsPlaying(false);
  };

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
