import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

/*
 * using data_13_21.json
 */

const data = require("./json/data_13_21.json");
const kodeJurusan = require('./json/kode_jurusan.json');

const getKodeJurusan = (nim) => {
}


// /////////////////////////////////////////////////
function App() {
  const [query, setQuery] = useState("");
  // const [result, setResult] = useState([]);

  // useEffect(() => {
  //   if (query.length > 0) {
  //     setResult(filtered);
  //   } else {
  //     setResult([]);
  //   }
  // }, [query]);

  

  const searchQueryHandler = (event) => {
    setQuery(event.target.value);
    console.log(query)
    // const byNimMatch = new RegExp(query)
    // setResult(data.match(byNimMatch));
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
          const byNimMatch = new RegExp(query);
          const byJurusanMatch = {
            
          }

          const nimFakultas = val[1];
          const nimJurusan = val[2];
          if (byNimMatch.test(nimFakultas) || byNimMatch.test(nimJurusan)) {
            return val;
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
