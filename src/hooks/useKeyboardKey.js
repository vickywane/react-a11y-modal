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
export const useTrapTabKey = ({ focusables, activeElement }) => {
    React.useEffect(() => {
        let currentElement = activeElement

        const eventListener = event => {

            // setTimeout(() => {
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
            // }, 500)
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

export const ENTER_KEY = {
    key: 'Enter',
    keyName: 'Enter',
    keyCode: 13,
};

export const TAB_KEY = {
    key: "Tab",
    keyName: "Tab",
    keyCode: 9
}
