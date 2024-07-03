import "./Footer.css"

//Show which question you are at and how many questions there are in total:
function Footer({ index, questions }) {
  return (
    <footer className='footer'>
        <p>
        <b>{index + 1}</b> / {questions.length}
        </p>
    </footer>
  )
}

export default Footer
