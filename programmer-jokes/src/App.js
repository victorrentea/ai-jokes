import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [newJoke, setNewJoke] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/api/jokes')
      .then(response => {
        setJokes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the jokes!', error);
      });
  }, []);

  const showJoke = (index) => {
    setCurrentJokeIndex(index);
  };

  const prevJoke = () => {
    setCurrentJokeIndex(currentJokeIndex > 0 ? currentJokeIndex - 1 : jokes.length - 1);
  };

  const nextJoke = () => {
    setCurrentJokeIndex((currentJokeIndex + 1) % jokes.length);
  };

  const randomJoke = () => {
    setCurrentJokeIndex(Math.floor(Math.random() * jokes.length));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewJokeChange = (e) => {
    setNewJoke(e.target.value);
  };

  const submitJoke = () => {
    if (newJoke.trim() !== "") {
      axios.post('http://localhost:5001/api/jokes', { content: newJoke })
        .then(response => {
          setJokes([...jokes, response.data]);
          setNewJoke("");
          closeModal();
          alert("Joke submitted successfully!");
        })
        .catch(error => {
          console.error('There was an error submitting the joke!', error);
        });
    } else {
      alert("Please enter a joke.");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Programmer Jokes</h2>
        <div className="joke">
          {jokes.length > 0 ? jokes[currentJokeIndex].content : 'Loading jokes...'}
        </div>
        <div className="buttons">
          <button className="button" onClick={prevJoke}>Prev</button>
          <button className="button" onClick={randomJoke}>Random</button>
          <button className="button" onClick={nextJoke}>Next</button>
        </div>
        <button className="submit-button" onClick={openModal}>Submit Joke</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Submit a Joke</h2>
            <textarea
              value={newJoke}
              onChange={handleNewJokeChange}
              rows="4"
              style={{ width: '100%' }}
            ></textarea>
            <button className="submit-modal-button" onClick={submitJoke}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
