import React, {useEffect, useState} from 'react'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>LZW Compression</h1>
        <h2>By Haziq Abiyyu Mahdy</h2>
      </header>
      <main>
        <TextForm></TextForm>
      </main>
    </>
  )
}

function TextForm() {
  const [inputText, setInputText] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [result, setResult] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setResult('')
    setErrorMessage('')

    console.log("Text: ", inputText)
    console.log("Option: ", selectedOption)
    // Make API request using the inputText
    try {
      let api = '/'

      // Get user option
      if (selectedOption === 'encode') {
        api = api.concat('compressText')
      }
      else if (selectedOption === 'decode') {
        api = api.concat('decompressText')
      }

      // call api
      const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify({ text: inputText }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log(data)

      // Process the response data
      if (data.success) {
        setResult(data.result)
      }
      else {
        setErrorMessage("Error occurred: " + data.errorMsg)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event) => {
    setInputText(event.target.value)
  }

  const handleSelect = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <form className='text-form' onSubmit={handleSubmit}>
      <label htmlFor='text-input' className='lbl-input-desc'>Insert text</label>
      <textarea
        onChange={handleChange}
        id='text-input'
        name='textInput'
        rows='20'
        required
      ></textarea>
      <label className='lbl-input-desc'>Select an option</label>
      <ul className='user-options'>
        <li>
          <input
            type='radio'
            name='option'
            value='encode'
            id='option-encode'
            onChange={handleSelect}
          />
          <label htmlFor='option-encode' className='lbl-option'>Encode</label>
        </li>
        <li>
          <input 
            type='radio'
            name='option'
            value='decode'
            id='option-decode'
            onChange={handleSelect}
          />
          <label htmlFor='option-decode' className='lbl-option'>Decode</label>
        </li>
      </ul>
      <div className='btn-container'>      
        <button type='submit' className='btn-submit'>Submit</button>
      </div>
      <hr></hr>
      <h3>RESULT</h3>
      <p className='error-message'>{errorMessage}</p>
      <p className='result-text'>{result}</p>
    </form>
  )
}

export default App