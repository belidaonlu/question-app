import "./Content.css"

//Show questions and options.
//Let the options appear based on the showOptions variable. Each option calls the checkLi function when clicked.
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
