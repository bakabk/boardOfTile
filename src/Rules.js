import React from 'react'

export default function Rules() {
    return (
        <div className='wrapper__rules'>
            <h3>Rules</h3>
            <p>In each round you should select two tiles with same color to make them disappear.
                If you selects two tiles with different colors then they are flipped to "closed" state.
                The game ends when you hide all tiles.
            </p>
        </div>
    )
}