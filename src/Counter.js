import React from 'react'

export default function Counter({counter, Up}) {
    return (
        <div>
            <p className='wrapper__counter' >Round: {counter}</p>
        </div>
    )
}