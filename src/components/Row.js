export default function Row(props) {

    function setRoleClass(role) {

        if(role == "Por") {
          return "player-role-goalkeeper"
        } else if(role == "Dc" || role == "Dd" || role == "Ds") {
          return "player-role-defender"
        } else if(role == "M" || role == "C" || role == "E") {
          return "player-role-midfielder"
        } else if(role == "T" || role == "W") {
          return "player-role-wing"
        } else if(role == "A" || role == "Pc") {
          return "player-role-forward"
        }
    }

    let ruoli = typeof(props.player.ruolo) != 'undefined' ? props.player.ruolo.split(',') : []
    return (
        <div className="player-row">
            <div className="player-name">{props.player.nome}</div>
            <div className="player-team">{props.player.squadra}</div>
            <div className={ruoli.length > 1 ? (ruoli.length > 2 ? "player-role triple-role" : "player-role double-role") : "player-role"}>
                {ruoli.map((ruolo) => <span key={ruolo} className={setRoleClass(ruolo)}>{ruolo}</span>)}
            </div>
            <div className="player-price">{props.player.prezzo_base}</div>
        </div>
    )
}