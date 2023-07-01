import React, {useState} from 'react'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>LZW Compression</h1>
        <h2>By Haziq Abiyyu Mahdy</h2>
      </header>
      <main>
        <TextForm/>
      </main>
    </>
  )
}

function TextForm() {
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult('');
    setErrorMessage('');
    setIsSubmitting(true);

    // Make API request using the inputText
    try {
      let api = 'https://test-deploy-xi-rouge.vercel.app/api/v1/';

      // Get user option
      if (selectedOption === 'encode') {
        api = api.concat('compressText');
      } 
      else if (selectedOption === 'decode') {
        api = api.concat('decompressText');
      }

      // call api
      const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify({ text: inputText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);

      // Process the response data
      if (data.success) {
        setResult(data.result);
      } else {
        setErrorMessage("Error occurred: " + data.errorMsg);
      }
    } 
    catch (error) {
      console.error(error);
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form className='text-form' onSubmit={handleSubmit}>
      <TextInput onChange={handleChange} />
      <UserOptions onSelect={handleSelect} />
      <SubmitButton isSubmitting={isSubmitting} />
      <Result errorMessage={errorMessage} result={result} />
    </form>
  );
}

function TextInput({ onChange }) {
  return (
    <div>
      <label htmlFor='text-input' className='lbl-input-desc'>
        Insert text
      </label>
      <textarea onChange={onChange} id='text-input' name='textInput' rows='20' required></textarea>
    </div>
  );
}

function UserOptions({ onSelect }) {
  return (
    <div>
      <label className='lbl-input-desc'>Select an option</label>
      <ul className='user-options'>
        <li>
          <input type='radio' name='option' value='encode' id='option-encode' onChange={onSelect} />
          <label htmlFor='option-encode' className='lbl-option'>
            Encode
          </label>
        </li>
        <li>
          <input type='radio' name='option' value='decode' id='option-decode' onChange={onSelect} />
          <label htmlFor='option-decode' className='lbl-option'>
            Decode
          </label>
        </li>
      </ul>
    </div>
  );
}

function SubmitButton({ isSubmitting }) {
  return (
    <div className='btn-container'>
      <button type='submit' className='btn-submit' disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}

function Result({ errorMessage, result }) {
  return (
    <div>
      <hr />
      <h3>RESULT</h3>
      <p className='error-message'>{errorMessage}</p>
      <p className='result-text'>{result}</p>
    </div>
  );
}

export default App