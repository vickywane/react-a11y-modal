import React, { useContext, useState } from 'react'
import "../styles/modal-style.css"
import AppContext from '../state/app-context'

const Modal = () => {
    const { isModalOpen, handleModalVisibility, handleUserSubscriptionData } = useContext(AppContext)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    return (
        <div
            className="modal" style={{
                display: !isModalOpen ? 'none' : 'flex'
            }}
        >
            <div className="modal-container">

                <div className="flex-row-container" >
                    <div className="modal-title" >
                        <h5 style={{ textAlign: "left" }} >Subscribe</h5>
                        <p>Get our latest updates in your inbox</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }} >
                        <button onClick={() => {
                            handleModalVisibility(false)
                        }} className="close-button">x</button>
                    </div>
                </div>

                <div className="modal-body">
                    <br />
                    <form onSubmit={e => {
                        e.preventDefault()

                        handleUserSubscriptionData({ name, email })
                    }} >
                        <div className="input-container" >
                            <label>Name:</label>
                            <input
                                onChange={e => setName(e.target.value)}
                                className="text-field"
                                type="text"
                                name="name"
                                placeholder="Your Name E.g John Doe"
                            />
                        </div>

                        <div className="input-container" >
                            <label>Email:</label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                className="text-field"
                                type="email"
                                name="email"
                                placeholder="Your Email E.g JohnDoe@gmail.com"
                            />
                        </div>

                        <br />
                        <div style={{ textAlign: "right" }} >
                            <div>
                                <button
                                    className="custom-btn"
                                    onClick={() => handleModalVisibility(false)}
                                    style={{ background: "transparent", border: '1px solid grey', color: "#000" }}
                                >
                                    Close
                                </button>

                                <input className="custom-btn" type="submit" name="submit" />
                            </div>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal
