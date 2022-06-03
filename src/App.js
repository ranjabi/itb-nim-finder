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
          const nama = val[0];
          const nimFakultas = val[1];
          const nimJurusan = val[2];

          const plainQueryAsPattern = new RegExp(query);
          const searchMethod = 0;
          const byNim = new RegExp(/\d{1,8}/);
          const byName = new RegExp(/[a-zA-Z]/);
          const byNimName = new RegExp(/\d{1,8}(\s?[a-zA-Z]*)*/);
          // const byNameNim = new RegExp(/\d{1,8}[a-zA-Z]/);
          // const byJurusanMatch = () => {
          //   const kodeJurusan = getKodeJurusan(query);

          // }

          if (byNim.test(query)) {
            // jika query berupa nim
            if (plainQueryAsPattern.test(nimFakultas) || plainQueryAsPattern.test(nimJurusan)) {
              // kembalikan data yang memiliki nim yang sama dengan query
              console.log("byNim");
              return val;
            }
          }
          if (byName.test(query)) {
            // jika query berupa nama
            if (plainQueryAsPattern.test(nama.toLowerCase())) {
              // kembalikan data yang memiliki nama yang sama dengan query
              console.log("byName");
              return val;
            }
          }
          if (byNimName.test(query)) {
            const splittedQuery = query.split(" ");
            const nimPattern = new RegExp(splittedQuery[0]);
            const namePattern = new RegExp(splittedQuery.slice(1).join(" "));

            if ((nimPattern.test(nimFakultas) || nimPattern.test(nimJurusan)) && namePattern.test(nama.toLowerCase())) {
              console.log("byNimName");
              return val;
            }
            // if (byNim.test(query) && byName.test(query)) {

            // }
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
