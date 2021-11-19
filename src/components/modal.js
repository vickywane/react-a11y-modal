import React, { useEffect, useContext, useState, useRef } from 'react'
import "../styles/modal-style.css"
import AppContext from '../state/app-context'
import useKeyboardKey, { ESCAPE_KEY, ENTER_KEY, useTrapTabKey } from '../hooks/useKeyboardKey'


const Modal = () => {
    const { isModalOpen, handleModalVisibility, handleUserSubscriptionData } = useContext(AppContext)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [allFocusableElements, setFocusableElements] = useState(null)
    const modalContainerRef = useRef(null)
    const [activeElement , setActiveElement ] = useState(null)

    useEffect(() => {
        if (modalContainerRef.current && isModalOpen) {
            const inputs = modalContainerRef.current.querySelectorAll('input')
            const focusable = modalContainerRef.current.querySelectorAll('button, [href], input, select, textarea');
            setFocusableElements(
                focusable
            )
            inputs[0].focus()
            setActiveElement(inputs[0])
        }

    }, [modalContainerRef, isModalOpen])

    useKeyboardKey({ callback: () => alert("SUBMIT USER DETAILS"), keyMatch: ENTER_KEY })
    useKeyboardKey({ callback: () => handleModalVisibility(false), keyMatch: ESCAPE_KEY })
    useTrapTabKey({ focusables: allFocusableElements, activeElement })

    return (
        <div
            className="modal" style={{
                display: !isModalOpen ? 'none' : 'flex'
            }}
        >
            <div
                className="modal-container"
                role="dialog"
                aria-labelledby="Subscribe dialog"
                aria-describedby="A dialog to subscribe for more news updates"
                ref={modalContainerRef}
            >
                <div className="flex-row-container" style={{ background: "white" }} >
                    <div className="modal-title" >
                        <h5 style={{ textAlign: "left" }} >Subscribe</h5>
                        <p>Get our latest updates in your inbox</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }} >
                        <button type="button" onClick={() => {
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

            <div className="modal-overlay" />
        </div>
    )
}

export default Modal
