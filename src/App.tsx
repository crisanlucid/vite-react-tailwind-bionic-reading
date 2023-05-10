import { useState } from 'react';
import './App.css';
import { BionicReaderPage } from './pages/BionicReaderPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <BionicReaderPage />
    </div>
  );
}

export default App;
