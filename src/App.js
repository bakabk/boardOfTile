import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import Counter from './Counter'
import Rules from './Rules'
import Cngratulations from './Cngratulations'
import Tiles from './Tiles'
const { detect } = require('detect-browser');
const browser = detect();

const initialState = {
    counter: 0,
    comparison: false,
    status: 'start',
    hiddenTiles: 0,
    openTiles: 0,
    tiles: [],
    openedTileIds: []
}

const totalTiles = 16
const colors = ['red', 'green', 'dimgray', 'sienna', 'yellow', 'teal', 'blue', 'purple']

class App extends Component {
    constructor() {
        super();

        this.state = initialState

        this.init = this.init.bind(this)
        this.handleRestart = this.handleRestart.bind(this)
        this.compareRandom = this.compareRandom.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.openTile = this.openTile.bind(this)
        this.hideTiles = this.hideTiles.bind(this)
        this.closeTiles = this.closeTiles.bind(this)
    }

    componentDidMount(){
        this.init()

        let app = findDOMNode(this.refs.wrapper)

        if(browser.name === 'ie') app.classList.add('ie')
    }

    handleClick(id){
        if (this.state.comparison) return

        let thisTile = this.state.tiles.find( (tile) => tile.id === id )

        if (thisTile.condition === 'closed'){
            this.openTile(thisTile.id)
        }
    }

    openTile(id) {
        const { openTiles, openedTileIds, tiles } = this.state;

        const counter = openTiles + 1;

        const newOpenTileIds = [ ...openedTileIds, id ];

        const newStateTiles = [ ...tiles ];
        const currentTile = newStateTiles.find(el => el.id === id);
        currentTile.condition = 'open';

        this.setState({
            openedTileIds: newOpenTileIds,
            openTiles: counter,
            tiles: newStateTiles
        });

        if(counter === 2) {
            this.setState({compare: true});

            setTimeout(this.comparisonTiles.bind(this), 1000)
        }
    }

    comparisonTiles(){
        const { openedTileIds, tiles } = this.state;

        let [firstTileId, secondTileId] = openedTileIds;
        let tileOneColor = tiles[firstTileId].color;
        let tileTwoColor = tiles[secondTileId].color;

        if(tileOneColor === tileTwoColor) {
            this.hideTiles();
        } else {
            this.closeTiles();
        }

        this.nextRound();

        this.setState({comparison: false});
    }

    closeTiles() {
        const { tiles, openedTileIds} = this.state;
        const newStateTiles = [ ...tiles ];

        openedTileIds.forEach(id => {
            newStateTiles[id].condition = 'closed';
        });

        this.setState({tiles: newStateTiles});
    }

    hideTiles() {
        const { tiles, hiddenTiles, openedTileIds } = this.state;

        const newStateTiles = [ ...tiles ];
        const closetTiles = hiddenTiles + 2;

        openedTileIds.forEach(id => {
            newStateTiles[id].condition = 'hidden';
        });

        this.setState({
            tiles: newStateTiles,
            hiddenTiles: closetTiles
        });
    }

    nextRound() {
        const rounds = this.state.counter + 1;

        this.setState({
            openedTileIds: [],
            openTiles: 0,
            counter: rounds
        });

        if(this.state.hiddenTiles === totalTiles) {
            this.setState({status: 'finished'});
        }
    }

    handleRestart() {
        this.setState(initialState)
        this.init()
    }

    compareRandom(a, b) {
        return Math.random() - 0.5;
    }

    init(){
        let tiles = colors.concat(colors).sort(this.compareRandom).map((color, id) => {
            return {
                id: id,
                color: color,
                condition: 'closed'
            }
        })

        this.setState({tiles: tiles})
    }

    render() {
        let tilesBoard = this.state.tiles.map( (tile) => {
            return (
                <Tiles Click={this.handleClick} key={tile.id}>
                    {tile}
                </Tiles>
            )})

        return (
            <div className='wrapper' ref='wrapper'>
                <h1>Board of tiles</h1>
                <Rules/>
                <Counter counter={this.state.counter}/>
                <div className="wrapper__tiles">
                    {this.state.status !== 'finished' ?
                        tilesBoard
                        :
                        <Cngratulations counter={this.state.counter} restart={this.handleRestart}/>
                    }
                </div>
            </div>
        )
    }
}

export default App