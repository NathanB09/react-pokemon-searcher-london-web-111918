import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

const PokemonCollection = ({ pokemon, flipPokemon }) => {
  return (
    <Card.Group itemsPerRow={6}>
      {pokemon.map(poke => <PokemonCard key={poke.id} poke={poke} flipPokemon={flipPokemon} />)}
    </Card.Group>
  )
}

export default PokemonCollection
