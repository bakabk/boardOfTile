import React, {Component} from 'react'
import './css/tiles.css'

export default class Tiles extends Component{
    constructor(props) {
        super(props);

        this.TileClick = this.TileClick.bind(this)
    }

    TileClick(){
        if (this.props.children.condition === 'hidden') return
        let id = this.props.children.id

        this.props.Click(id)
    }

    render (){

        let tile = this.props.children
        let style = {'backgroundColor': ''}

        let tileClasses = ['wrapper__tile_block']

        if (tile.condition === 'open'){
            tileClasses.push('is-open')
            style = {'backgroundColor': tile.color}
        } else if (tile.condition === 'hidden'){
            tileClasses.push('is-hidden')
        }



        return(
            <div
                className={tileClasses.join(' ')}
                onClick={this.TileClick}
            >
                <div className='tile wrapper__tile_front'>
                    <div
                        className='tile wrapper__tile_back'
                        style={style}
                    ></div>
                </div>

            </div>
        )
    }
}