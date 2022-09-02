import React from 'react'

export default function TableHeaderColumn(props) {

    const [order, setOrder] = React.useState('asc')

    function handleClick() {
        let newOrder = order == 'asc' ? 'desc' : 'asc'
        setOrder(newOrder)
        props.handle(props.attr, order, props.type)
        props.refresh()
    }

    return (
            <div className={props.class} onClick={
                                         () => handleClick()}
            >
                {props.text} &uarr;&darr;
            </div>
    )
}