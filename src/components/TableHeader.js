import TableHeaderColumn from './TableHeaderColumn';

export default function TableHeader(props) {

    return (
        <div className="player-row header-row">
            <TableHeaderColumn handle={props.handle}
                               attr={"nome"}
                               type={"string"}
                               text={"Nome"}
                               class={"player-name"}
                               refresh={props.refresh}
            />
            <TableHeaderColumn handle={props.handle}
                               attr={"squadra"}
                               type={"string"}
                               text={"Squadra"}
                               class={"player-team"}
                               refresh={props.refresh}
            />
            <TableHeaderColumn handle={props.handle}
                               attr={"ruolo"}
                               type={"role"}
                               text={"Ruolo"}
                               class={"player-role"}
                               refresh={props.refresh}
            />
            <TableHeaderColumn handle={props.handle}
                               attr={"prezzo_base"}
                               type={"number"}
                               text={"P.B."}
                               class={"player-price"}
                               refresh={props.refresh}
            />
        </div>
    )
}