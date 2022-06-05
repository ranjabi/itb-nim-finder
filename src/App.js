import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

/*
 * using data_13_21.json
 */

const data = require("./json/data_13_21.json");
const kodeJurusan = require("./json/kode_jurusan.json");
const kodeFakultas = require("./json/kode_fakultas.json");
const listJurusan = require("./json/list_jurusan.json");
const listFakultas = require("./json/list_fakultas.json");

const getJurusan = (kodeJurusan) => {
  // mengembalikan nama jurusan dari kode jurusan
  for (const [key, value] of Object.entries(listJurusan)) {
    if (key === kodeJurusan) {
      return value;
    }
  }
};

const getFakultas = (kodeFakultas) => {
  // mengembalikan nama fakultas dari kode fakultas
  for (const [key, value] of Object.entries(listFakultas)) {
    if (key === kodeFakultas) {
      return value;
    }
  }
};

const getKodeJurusan = (namaJurusan) => {
  // mengembalikan kode jurusan dari nama jurusan
  for (const [key, value] of Object.entries(kodeJurusan)) {
    if (key.toLowerCase() === namaJurusan.toLowerCase()) {
      return value;
    }
  }
  return -1;
};

const getKodeFakultas = (namaFakultas) => {
  // mengembalikan kode fakultas dari nama fakultas
  for (const [key, value] of Object.entries(kodeFakultas)) {
    if (key.toLowerCase() === namaFakultas.toLowerCase()) {
      return value;
    }
  }
  return -1;
};

function App() {
  const [query, setQuery] = useState("");
  const [res, setRes] = useState([]);

  const searchQueryHandler = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };

  const result = (query) => {
    setRes(
      data.filter(
        function (val) {
          if (this.count < 15) {
            const nama = val[0];
            const nimFakultas = val[1];

            let nimJurusan = 9999;
            if (val.length === 3) {
              nimJurusan = val[2];
            }

            const plainQueryAsPattern = new RegExp(query);
            const searchMethod = 0;

            const byNim = new RegExp(/\d{3,8}/);
            const byName = new RegExp(/([a-zA-Z]{3,}\s?)+/);

            const byNimName = new RegExp(/\d{3,8}\s([a-zA-Z]{3,}\s?)+/);
            const byNameNim = new RegExp(/([a-zA-Z]{3,}\s?)+\d{3,8}/);

            const byMajorname = new RegExp(/([a-zA-Z]{2,}\s?)+/);

            if (byNim.test(query)) {
              // query nim
              if (
                plainQueryAsPattern.test(nimFakultas) ||
                plainQueryAsPattern.test(nimJurusan)
              ) {
                // kembalikan data yang memiliki nim yang sama dengan query
                console.log("byNim");
                this.count++;
                return val;
              }
            }
            if (byName.test(query)) {
              // query nama
              if (plainQueryAsPattern.test(nama.toLowerCase())) {
                console.log("byName");
                this.count++;
                return val;
              }
            }
            if (byNimName.test(query)) {
              // query <nim> <nama>
              const splittedQuery = query.split(" ");
              const nimPattern = new RegExp(splittedQuery[0]);
              const namePattern = new RegExp(splittedQuery.slice(1).join(" "));

              if (
                (nimPattern.test(nimFakultas) || nimPattern.test(nimJurusan)) &&
                namePattern.test(nama.toLowerCase())
              ) {
                console.log("byNimName");
                this.count++;
                return val;
              }
            }
            if (byNameNim.test(query)) {
              // query <nama> <nim>
              const splittedQuery = query.split(" ");
              const nimPattern = new RegExp(
                splittedQuery[splittedQuery.length - 1]
              );
              const namePattern = new RegExp(
                splittedQuery.slice(0, -1).join(" ")
              );

              if (
                (nimPattern.test(nimFakultas) || nimPattern.test(nimJurusan)) &&
                namePattern.test(nama.toLowerCase())
              ) {
                console.log("byNameNim");
                this.count++;
                return val;
              }
            }

            // TODO: bikin input jurusan ex. informatika matematika dari list_fakultas.json and list_jurusan.json

            if (byMajorname.test(query)) {
              // input jurusan. ex: IF MA
              const splittedQuery = query.split(" ");
              const majorQuery = splittedQuery[splittedQuery.length - 1];
              const namePattern = new RegExp(
                splittedQuery.slice(0, -1).join(" ")
              );

              if (
                getKodeFakultas(majorQuery) !== -1 ||
                getKodeJurusan(majorQuery) !== -1
              ) {
                const nimPattern1 = new RegExp(getKodeJurusan(majorQuery));
                const nimPattern2 = new RegExp(getKodeFakultas(majorQuery));
                if (
                  (namePattern.test(nama.toLowerCase()) &&
                    nimPattern2.test(nimFakultas)) ||
                  nimPattern1.test(nimJurusan)
                ) {
                  console.log("byMajorName");
                  this.count++;
                  return val;
                }
              }
            }
          }
        },
        { count: 0 }
      )
    );
  };

  const showResult = () => {};

  const resultList = () => {
    result(query) === undefined ? void 0 : result(query);
  };

  // .filter((val, idx) => idx < 10)
  // .map((val, key) => {
  //   return (

  //   );
  // })

  return (
    <div className="main">
      <Navbar />
      <h1>Find Someone!</h1>
      <div className="query">
        <input
          type="text"
          name="query"
          id=""
          placeholder="<nama> <nim> <jurusan/fakultas>"
          onChange={(event) => searchQueryHandler(event)}
        />
        <button type="submit" onClick={resultList}>
          Search
        </button>
        {/* </form> */}
        {res.map((val, key) => {
          return (
            <div className="result" key={key}>
              <p>
                {val[0]} <span className="jurusan"><span className="nim">{val[1]} {val.length === 3 && val[2]}{" "}</span> 
                {val.length === 3
                  ? getJurusan(val[2].toString().slice(0, 3))
                  : getFakultas(val[1].toString().slice(0, 3))}</span>
              </p>
            </div>
          );
        })}
      </div>
      <div id="how" className="how">
        <p>Possible Queries:</p>
        <p>nim</p>
        <p>name</p>
        <p>nim name</p>
        <p>name nim</p>
        <p>fakultas/jurusan</p>
        <p>soon fakultas/jurusan angkatan</p>
        <p>soon nama fakultas/jurusan angkatan</p>
        <p>soon nama angkatan fakultas/jurusan</p>
      </div>
      <div id="about" className="about">
        Created by: Ranjabi
      </div>
    </div>
  );
}

export default App;
