import React from 'react'
import Row from './Row';
import Form from './Form';
import TableHeader from './TableHeader';

export default function MainContent() {

    const [players, setPlayers] = React.useState([{}])
    const [filter, setFilter] = React.useState('')
    const [orderKey, setOrderKey] = React.useState('squadra')
    const [orderDirection, setOrderDirection] = React.useState('asc')
    const [orderType, setOrderType] = React.useState('string')

    React.useEffect(retrievePlayers, [0])

    function retrievePlayers() {
        fetch("https://fantafavaro-api.herokuapp.com/index.php/get_players?token=p6h72m0zd3j38uqer&mode=available")
          .then(res => res.json())
          .then(function(data) {
             setPlayers(data.data)
          })
    }

    function applyFilterRule(player) {
        if(typeof(player.nome) != 'undefined' && filter.length) {
            let isPlayerNameBegin = player.nome.substr(0, filter.length) == filter
            let isTeamNameBegin = player.squadra.substr(0, filter.length) == filter
            return isPlayerNameBegin || isTeamNameBegin
        } else
          return true
    }

    function applyOrderRule(first, second) {
       if(orderType == 'string') {
          if(first[orderKey].toLowerCase() > second[orderKey].toLowerCase()) {
             return orderDirection == 'asc' ? 1 : -1
          } else if(first[orderKey].toLowerCase() < second[orderKey].toLowerCase()) {
             return orderDirection == 'asc' ? -1 : 1
          } else
             return 0
       } else if(orderType == 'number') {

          if(orderDirection == 'asc') {
            return first[orderKey] - second[orderKey]
          } else {
            return second[orderKey] - first[orderKey]
          }
       } else if(orderType == 'role') {
           let firstIndex = setRoleCardinality(first.ruolo.split(',')[0])
           let secondIndex = setRoleCardinality(second.ruolo.split(',')[0])
           if(orderDirection == 'asc') {
              return firstIndex-secondIndex
           } else {
              return secondIndex-firstIndex
           }
       }
       
    }

    function setRoleCardinality(role) {
        switch(role) {
            case 'Por':
              return 0
            case 'Dc':
              return 1
            case 'Ds':
              return 2
            case 'Dd':
              return 3
            case 'E':
              return 4
            case 'M':
              return 5
            case 'C':
              return 6
            case 'W':
              return 7
            case 'T':
              return 8
            case 'A':
              return 9
            case 'Pc':
              return 10              
        }            
    }

    function handleFilter(string) {
        let newFilter = ""
        for(let i=0; i < string.split("").length; i++) {
            if(i == 0 || string.split("")[i-1] == " ") {
                newFilter += string.split("")[i].toUpperCase()
            } else {
                newFilter += string.split("")[i]
            }
        }
        setFilter(newFilter)
    }

    function orderPlayers(key, direction, type) {
        //console.log(direction)
        setOrderKey(key)
        setOrderDirection(direction)
        setOrderType(type)
    }

    let selectedPlayers = players.sort(applyOrderRule)
                                 .filter(applyFilterRule)
    return (
            <div className='player-table'>
                <Form handle={handleFilter} 
                />
                <TableHeader handle={orderPlayers}/>
                {selectedPlayers.map((player) => <Row player={player}
                                                      key={player.id}
                                                 />
                            )
                }   
            </div>
            
    )
}