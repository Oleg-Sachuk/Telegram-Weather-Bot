import React, { useState } from 'react';
import '../App.css';
import { useHttp } from '../hook/RequestHttp';

const Input = () => {
    const { request } = useHttp()
    let [id, setId] = useState(null)

    const HandleInput = async (event) => {
        event.preventDefault();
        event.stopPropagation()
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let place = JSON.stringify({
            city: event.target[0].value
        });
        let data = await request("http://localhost:5000/api/weather/current", "POST", place, myHeaders)
        if(data !== null) setId(data)
        request("http://localhost:5000/api/google/getsheet", "POST", JSON.stringify({id, place: event.target[0].value}))
        document.getElementById("city").value = "";
    }

    return (
        <div>
            <form onSubmit={HandleInput}>
                <label>
                    <input id='city' className='city' name={'city'} placeholder={'type the city'} type={"text"} />
                </label>
                <button className='sbmt' type={'submit'}>Submit</button>
            </form>
        </div>
    )
}

export default Input;