import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => { const fetchData = async () => { 
    try {
      const response = await fetch('/api/data')
        .then(res => res.json());
      console.log(response);
      setData(response?.weatherData);
    } catch (error) { 
      console.error(error);
    }
  }; 
    fetchData(); 
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div> {data ? ( <p>Got data</p> ) : ( <p>Loading data...</p> )} </div>
      </header>
    </div>
  );
}

export default App;
