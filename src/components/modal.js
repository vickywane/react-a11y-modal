import React, { useEffect, useContext, useState, useRef } from 'react'
import AppContext from '../state/app-context'
import useKeyboardKey, { ESCAPE_KEY, useTrapTabKey } from '../hooks/useKeyboardKey'

const Modal = () => {
    const { isModalOpen, handleModalVisibility, handleUserSubscriptionData } = useContext(AppContext)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [allFocusableElements, setFocusableElements] = useState(null)
    const modalContainerRef = useRef(null)

    useEffect(() => {
        if (modalContainerRef.current && isModalOpen) {
            const inputs = modalContainerRef.current.querySelectorAll('input')
            const focusable = modalContainerRef.current.querySelectorAll('button, [href], input, select, textarea');
            setFocusableElements(
                focusable
            )
            inputs[0].focus()
        }

    }, [modalContainerRef, isModalOpen])

    useKeyboardKey({ callback: () => modalContainerRef.current.close(), keyMatch: ESCAPE_KEY })
    useTrapTabKey({ focusables: allFocusableElements })

    return (
        <div className="modal">
            <dialog
                open
                className="modal-container"
                aria-labelledby="modal-headline"
                aria-describedby="modal-info"
                ref={modalContainerRef}
            >
                <div className="flex-row-container" style={{ background: "white" }} >
                    <div className="modal-title" >
                        <h5 id="modal-headline" style={{ textAlign: "left" }} >Subscribe</h5>
                        <p id="modal-info" >Get our latest updates in your inbox</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }} >
                        <button type="button" aria-keyshortcuts="Escape" onClick={() => modalContainerRef.current.close()} className="close-button">x</button>
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
            </dialog>

            <div className="modal-overlay" />
        </div>
    )
}

export default Modal
