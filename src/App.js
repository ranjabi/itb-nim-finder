import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

/*
 * using data_13_21.json
 */

const data = require("./json/data_13_21.json");
const kodeJurusan = require('./json/kode_jurusan.json');

const getKodeJurusan = (namaJurusan) => {
  // mengembalikan kode jurusan dari nama jurusan
  for (const [key, value] of Object.entries(kodeJurusan)) {
    if (key.toLowerCase() === namaJurusan.toLowerCase()) {
      return value;
    }
  }
}


// /////////////////////////////////////////////////
function App() {
  const [query, setQuery] = useState("");

  const searchQueryHandler = (event) => {
    setQuery(event.target.value);
    console.log(query)
  };

  return (
    <div>
      <h1>Find Someone!</h1>
      <input
        type="text"
        name="query"
        id=""
        placeholder="format"
        onChange={(event) => searchQueryHandler(event)}
      />
      {data
        .filter((val, idx) => idx < 10)
        .filter((val) => {
          const nama = val[1];
          const nimFakultas = val[1];
          const nimJurusan = val[2];

          const plainQuery = new RegExp(query);
          const searchMethod = 0;
          const byNim = new RegExp(/\d{1,8}/);
          // const byJurusanMatch = () => {
          //   const kodeJurusan = getKodeJurusan(query);

          // }

          if (byNim.test(query)) {
            // jika query berupa nim
            if (plainQuery.test(nimFakultas) || plainQuery.test(nimJurusan)) {
              // kembalikan data yang memiliki nim yang sama dengan query
              return val;
            }
          }




        })
        .map((val, key) => {
          return (
            <div key={key}>
              <p>
                {val[0]} {val[1]} {val[2]}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
