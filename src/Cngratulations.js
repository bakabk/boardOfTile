import React from 'react'

export default function Counter({counter, restart}) {
    return (
        <div className='wrapper__end'>
            <p>Game is end, Congratulations!</p>
            <p>Round: {counter}</p>
            <button onClick={restart}>Restart</button>
        </div>
    )
}