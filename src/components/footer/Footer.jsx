import "./Footer.css"

//kaçıncı soruda olunduğunu ve toplam kaç soru olduğunu göster:
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