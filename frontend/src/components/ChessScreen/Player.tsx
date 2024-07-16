import React from 'react'

function Player(pinfo: any, isOwner: boolean = false) {

    const [player, setPlayer] = React.useState<any>(pinfo.pinfo)

    return (

        <div className={isOwner ? "player-container owner" : "player-container"}>
            <div className="player-name">{player.name}</div>

            <div className="moves">
                {
                    player.moves.map((move: any, index: number) => {
                        return (
                            <div key={index} className="move">
                                <span className="move-number">{index + 1}</span>
                                <span className="move-text">{move}</span>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Player
