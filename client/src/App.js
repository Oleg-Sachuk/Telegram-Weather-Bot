import './App.css';

function App() {
  const HandleInput = async (event) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let place = JSON.stringify({
      "city": `${event.target[0].value}`
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: place,
      redirect: 'follow'
    };

    await fetch("http://localhost:5000/api/weather/current", requestOptions)
      .then(response => response.text())
      .catch(error => console.log('error', error))

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Type the city and I'll send the weather</h1>
        <p>But first send the message to the bot :)</p>
        <div>
          <form onSubmit={HandleInput}>
            <label>
              <input className='city' name={'city'} placeholder={'type the city'} type={"text"} />
            </label>
            <button className='sbmt' type={'submit'}>Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
