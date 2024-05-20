import "./Content.css"

//soruları ve seçenekleri göster. Seçenekler, showOptions değişkenine bağlı olarak görünsun. her seçenek, tıklandığında checkLi fonksiyonunu cagirsin.
function Content({ index, data, checkLi, showOptions  }) {
  return (
    <div className='content'>
        <h3>{index + 1}) {data.question}</h3>
        <img src={`/assets/pictures/${data.media}`} alt="" />
        <ul>
        {data.options.map((option, idx) => (
            <li key={idx} onClick={(event) => checkLi(event, option)}>
            {showOptions ? option : ""}
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Content