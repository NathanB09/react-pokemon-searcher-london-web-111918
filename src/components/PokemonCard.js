import React from 'react'
import { Card } from 'semantic-ui-react'

const PokemonCard = ({ poke, flipPokemon }) => {
  const hp = poke.stats.find(stat => stat.name === 'hp').value
  return (
    <Card onClick={() => flipPokemon(poke.id)}>
      <div>
        <div className="image">
          <img src={poke.showFront ? poke.sprites.front : poke.sprites.back} alt="oh no!" />
        </div>
        <div className="content">
          <div className="header">{poke.name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {hp}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default PokemonCard
