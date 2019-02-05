import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    filteredPokemon: []
  }

  fetchData = (api) => {
    return fetch(api)
      .then(resp => resp.json())
  }

  componentDidMount() {
    this.fetchData('http://localhost:3000/pokemon')
      .then(pokemon => {
        const newPoke = pokemon.map(poke => {
          poke.showFront = true
          return poke
        })

        this.setState({ pokemon: newPoke, filteredPokemon: newPoke })
      })
  }

  flipPokemon = (id) => {
    const newPokeArr = [...this.state.pokemon]
    const poke = newPokeArr.find(singlePoke => singlePoke.id === id)
    poke.showFront = !poke.showFront

    this.setState({ pokemon: newPokeArr })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newPokemon = {
      name: e.target.name.value,
      stats: [
        {
          value: parseInt(e.target.hp.value),
          name: 'hp'
        }
      ],
      sprites: {
        front: e.target.frontUrl.value,
        back: e.target.backUrl.value
      }
    }
    this.persistPokemon(newPokemon)
  }

  persistPokemon = (poke) => {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poke)
    })
      .then(resp => resp.json())
      .then(newPokemon => {
        newPokemon.showFront = true
        this.setState({ pokemon: [...this.state.pokemon].concat([newPokemon]) })
      })
  }

  handleSearch = (e) => {
    e.preventDefault()
    const filtered = [...this.state.pokemon].filter(poke => poke.name.includes(e.target.value))
    this.setState({ filteredPokemon: filtered })
  }



  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.handleSearch} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.state.filteredPokemon} flipPokemon={this.flipPokemon} />
        <br />
        <PokemonForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default PokemonPage
