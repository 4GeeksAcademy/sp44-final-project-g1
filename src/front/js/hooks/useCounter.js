import { useState } from "react"


export const useCounter= ( initialValue ) => {

    const [counter, setCounter] = useState( initialValue )

    const increment = (value) => setCounter (counter +1)

    const decrement = (value) => {
        // Si el contador es igual a 0 no decrementar mas
        if (counter === 0) return; 
        setCounter (counter -1)}

    const reset = () => setCounter (initialValue)

  return {

        counter,
        increment,
        decrement,
        reset
    
    }
}
