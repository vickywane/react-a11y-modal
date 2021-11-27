import React from 'react'

const useKeyboardKey = ({ callback, keyMatch }) => {
    React.useEffect(() => {
        const eventListener = event => {
            let isRecognizedKey = false;
            if ('key' in event) {
                isRecognizedKey = event.key === keyMatch.key || event.key === keyMatch.keyName;
            } else {
                isRecognizedKey = event.keyCode === keyMatch.keyCode;
            }

            if (isRecognizedKey) {
                callback();
            }
        };

        document.addEventListener('keydown', eventListener);
        return () => {
            document.removeEventListener('keydown', eventListener);
        };
    })
}

// designed for only tab key
export const useTrapTabKey = ({ focusables }) => {
    React.useEffect(() => {
        let currentElement = document.activeElement

        const eventListener = event => {

            if (currentElement) {
                if (event.code === "Tab" || event.key === "Tab") {
                    currentElement = document.activeElement
                    const arr = Object.entries(focusables)
                    const lastElem = arr[arr.length - 1]

                    if (lastElem[1].isSameNode(currentElement)) {
                        arr[0][1].focus()

                        event.preventDefault()
                    }
                }
            };
        }

        document.addEventListener('keydown', eventListener);

        return () => {
            document.removeEventListener('keydown', eventListener);
        };
    })
}

export default useKeyboardKey

export const ESCAPE_KEY = {
    key: 'Escape',
    keyName: 'Esc',
    keyCode: 27,
};