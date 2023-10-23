import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', { transports: ['websocket'] });

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
  
    socket.on('updateCounter', (updatedCounter) => {
      setCounter(updatedCounter);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const incrementCounter = () => {
    console.log('Incrementing counter...');
    socket.emit('increment');
  };

  return (
    <div className="App">
      <h1>Counter</h1>
      <p>Counter: {counter}</p>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
}

export default App;
