import './App.css';
import React, { useContext } from 'react'
import Modal from './components/modal';
import AppContext, { AppProvider } from './state/app-context'
import { useEffect } from 'react/cjs/react.development';

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

const Home = () => {
  const { isModalOpen, handleModalVisibility } = useContext(AppContext)

  useEffect(() => {
    handleModalVisibility(true)
  }, [])

  return (
    <div className="App">
      <div className="home-container" >
        <h1> Hello React </h1>

        <button className="custom-btn" onClick={() => handleModalVisibility(!isModalOpen)} >
          Sign Up Now
        </button>
      </div>

      <Modal />
    </div>
  )
}

export default App;
