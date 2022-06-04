import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

/*
 * using data_13_21.json
 */

const data = require("./json/data_13_21.json");
const kodeJurusan = require('./json/kode_jurusan.json');
const kodeFakultas = require('./json/kode_fakultas.json');

const getKodeJurusan = (namaJurusan) => {
  // mengembalikan kode jurusan dari nama jurusan
  for (const [key, value] of Object.entries(kodeJurusan)) {
    if (key.toLowerCase() === namaJurusan.toLowerCase()) {
      return value;
    }
  }
  return -1;
}

const getKodeFakultas = (namaFakultas) => {
  // mengembalikan kode fakultas dari nama fakultas
  for (const [key, value] of Object.entries(kodeFakultas)) {
    if (key.toLowerCase() === namaFakultas.toLowerCase()) {
      return value;
    }
  }
  return -1;
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
          const byNameNim = new RegExp(/([a-zA-Z]*\s?)*\d{1,8}/);

          const byJurusanFakultas = new RegExp(/[a-zA-Z]{2,4}/);

          // byNameJurusan   bagus ti
          // byJurusanName   ti bagus

          const byNameJurusan = new RegExp(/([a-zA-Z]*\s?)*[a-zA-Z]{2,4}/);
          // const byJurusanName = new RegExp

          // const byNimNameJurusan = new RegExp(/\d{1,8}(\s?[a-zA-Z]*)*/);
          // const byNameNimJurusan = new RegExp(/([a-zA-Z]*\s?)*\d{1,8}\s[a-zA-Z]{2,4}/);
          // const byJurusanNimName = new RegExp(/[a-zA-Z]{2,4}\s\d{1,8}(\s?[a-zA-Z]*)*/)
          // const byJurusanNameNim = new RegExp(/[a-zA-Z]{2,4}\s([a-zA-Z]*\s?)*\d{1,8}/)

          if (byNim.test(query)) {
            // query nim
            if (plainQueryAsPattern.test(nimFakultas) || plainQueryAsPattern.test(nimJurusan)) {
              // kembalikan data yang memiliki nim yang sama dengan query
              console.log("byNim");
              return val;
            }
          }
          if (byName.test(query)) {
            // query nama
            if (plainQueryAsPattern.test(nama.toLowerCase())) {
              console.log("byName");
              return val;
            }
          }

          if (byNimName.test(query)) {
            // query <nim> <nama>
            const splittedQuery = query.split(" ");
            const nimPattern = new RegExp(splittedQuery[0]);
            const namePattern = new RegExp(splittedQuery.slice(1).join(" "));

            if ((nimPattern.test(nimFakultas) || nimPattern.test(nimJurusan)) && namePattern.test(nama.toLowerCase())) {
              console.log("byNimName");
              return val;
            }
          }
          if (byNameNim.test(query)) {
            // query <nama> <nim>
            const splittedQuery = query.split(" ");
            const nimPattern = new RegExp(splittedQuery[splittedQuery.length - 1]);
            const namePattern = new RegExp(splittedQuery.slice(0,-1).join(" "));

            if ((nimPattern.test(nimFakultas) || nimPattern.test(nimJurusan)) && namePattern.test(nama.toLowerCase())) {
              console.log("byNameNim");
              return val;
            }
          }

          if (byJurusanFakultas.test(query)) {
            // query <fakultas> or <jurusan>
            if (getKodeJurusan(query) !== -1 || getKodeFakultas(query) !== -1) {
              const nimPattern1 = new RegExp(getKodeJurusan(query));
              const nimPattern2 = new RegExp(getKodeFakultas(query));
              // console.log(getKodeJurusan(query));
              if ((nimPattern2.test(nimFakultas) || nimPattern1.test(nimJurusan))) {
                console.log("masuk jurusan fakultas")
                return val;
              }
            }
          }

          if(byNimNameJurusan.test(query)) {
            const splittedQuery = query.split(" ");
            const nim = new RegExp(splittedQuery[0]);

            const kodeJurusanFakultas = splittedQuery[splittedQuery.length-1];
            const jurusanPattern = new RegExp(getKodeJurusan(kodeJurusanFakultas));
            const fakultasPattern = new RegExp(getKodeFakultas(kodeJurusanFakultas));

            const namaPattern = new RegExp(splittedQuery.slice(1,-1).join(" "));

            if ((nim.test(nimFakultas) || nim.test(nimJurusan)) && namaPattern.test(nama.toLowerCase()) && (fakultasPattern.test(nimFakultas) || jurusanPattern.test(nimJurusan))) {

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
