import './App.css';
import Input from './components/Input';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Type the city and I'll send the weather</h1>
        <p>But first send the message to the bot :)</p>
        <Input />
      </header>
    </div>
  );
}

export default App;
