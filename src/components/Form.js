import React from 'react'
export default function Form(props) {

    const [string, setString] = React.useState('')

    function handleChange(event) {
        setString(event.target.value)
        props.handle(event.target.value)
        props.refresh()
    }

    return (
       <form>
         <label>Filtra</label>
         <input onChange={handleChange}
                name="filter"
                value={string}
         />
       </form>
    )
}