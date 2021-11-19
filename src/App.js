import './App.css';
import React, { useContext } from 'react'
import Modal from './components/modal';
import AppContext, { AppProvider } from './state/app-context'

import "./styles/modal-style.css"

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

const Home = () => {
  const { isModalOpen, handleModalVisibility } = useContext(AppContext)

  return (
    <div className="App">
      <div style={{ zIndex: 1 }}>
        <h1> Sign Up To Recieve Our Next Updates </h1>

        <button className="custom-btn" onClick={() => handleModalVisibility(!isModalOpen)} >
          Sign Up Now
        </button>
      </div>

      <Modal />
    </div>
  )
}

export default App;
