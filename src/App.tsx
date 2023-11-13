import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./redux/counterSlice";
import { RootState } from "./redux/store";
import axios from 'axios';

export default function App() {
  const { count } = useSelector((state: RootState) => state.counter1); // see store.ts
  const dispatch = useDispatch();
  
  const getResultFromServer = async () => {
    console.log('in getResultFromServer()')
    const res = axios.get('http://localhost:3000/test2').then(res => {
      console.log('in res')
      let asd = 4
      asd += 1
      console.log(res)
    })

    
  }

  return (
    <div className="App">
      <button onClick={() => getResultFromServer()}>
        call server
      </button>

      <br />
      <br />
      <br />

      <h1>{count}</h1>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        ++++
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -----
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          dispatch(incrementByAmount(10));
        }}
      >
        +10
      </button>
    </div>
  );
}
