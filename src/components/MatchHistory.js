// import axios from "axios";
// import { useEffect, useState } from "react";
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { lobbyTypeData } from '../data/LobbyType';

const MatchHistory = ({ recentMatchesData, heroesData }) => {

    const [radiantWin, setRadiantWin] = useState();

    // console.log(recentMatchesData)
    // console.log(lobbyTypeData)

    // for (const key in lobbyTypeData) {
    //     console.log(`${lobbyTypeData[key].id}: ${lobbyTypeData[key].name}`);

    // }



    return (
        <div>
            <p className="header">LATEST MATCHES</p>
            <div className="playerInfoBox">
                <div className="recentMatchesNav">
                    <div className="label1">Hero</div>
                    <div className="label2">Result</div>
                    <div className="label3">Type</div>
                    <div className="label4">Duration</div>
                    <div className="label5">KDA</div>
                </div>
                {recentMatchesData?.map((matchHistoryObject) => {
                    // console.log(matchHistoryObject)

                    const findHero = heroesData?.filter((heroObject) => {
                        return `${heroObject.hero_id}` === `${matchHistoryObject.hero_id}`
                    })

                    // console.log(heroesData)

                    const findHeroName = heroesData?.filter((heroObject) => {
                        return heroObject.hero_id === matchHistoryObject.hero_id
                    })

                    const playerWin = (matchHistoryObject.radiant_win && matchHistoryObject.player_slot <= 127) || (!matchHistoryObject.radiant_win && matchHistoryObject.player_slot > 127)
                    let lobbyType = 'default';
                    for (const key in lobbyTypeData) {
                        // console.log(`${lobbyTypeData[key].id}: ${lobbyTypeData[key].name}`);
                        if (matchHistoryObject.lobby_type === lobbyTypeData[key].id) {
                            lobbyType = lobbyTypeData[key].name;
                        }
                    }
                    // console.log(lobbyType)

                    const lobbyTypeString = lobbyType.replace('lobby_type_', '')

                    const durationFixed = Math.floor(matchHistoryObject.duration / 60)

                    const durationSeconds = matchHistoryObject.duration % 60



                    return (
                        <div className="matchHistoryContainer">
                            <Link to={`/matches/${matchHistoryObject.match_id}`}>
                                <li className="matchHistory">
                                    <div className="row1">
                                        <img src={`https://api.opendota.com${findHero[0].img}`} alt="" className='mostPlayedHeroesImg' />
                                        <span className="playedHeroName">{findHeroName[0].localized_name}</span>
                                    </div>
                                    <div className="row2">
                                        {/* <span className={playerWin ? 'matchWon' : "matchLose"}>{playerWin ? 'Won Match' : 'Lost Match'}</span> */}
                                        {playerWin ? <span className='matchWon'>Won Match</span> : <span className='matchLose'>Lost Match</span>}
                                    </div>
                                    <div className="row3">
                                        <span className='lobbyType'>{lobbyTypeString}</span>
                                    </div>
                                    <div className="row4">
                                        <span className="gameDuration">{durationFixed}:{durationSeconds}</span>
                                    </div>
                                    <div className="row5">
                                        <span className="kda">{matchHistoryObject.kills}/{matchHistoryObject.deaths}/{matchHistoryObject.assists}</span>
                                    </div>
                                </li>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MatchHistory;