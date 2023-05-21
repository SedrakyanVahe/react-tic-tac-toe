function Box(props) {
  return (
    <button className='box' onClick={props.onBoxClick}>
      {props.value}
    </button>
  )
}

export default Box
