

const handleInput = (input, setInput) => {

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <input onChange={handleInput} />
      <p>{input}</p>    // This will render the text you enter in the input box
    </div>
  )
}

export default handleInput