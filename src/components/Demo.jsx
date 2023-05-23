/* eslint-disable no-unused-vars */
import React from 'react'

function Demo() {

    const HistoryHandler = () => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'VAAS-API-Key': 'test-x0848bd789fjk13'  },
            body: JSON.stringify({ 
                vaas_sid: '83b04e59fc7403b2848f279fa2722c73',
                question: "nipa" })
        };
        fetch('https://testenv.innobyteslab.com/vaas/history/', requestOptions)
            .then(response => response.json())
            .then(data => console.log("data", data.history));
        
    }

  return (
    <div>
        <h1>Demo file</h1>
        <button onClick={HistoryHandler}>Click Api</button>

    </div>
  )
}

export default Demo