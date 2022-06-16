import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';

/*
 * using data_13_21.json
 */

const data = require('./json/data_13_21.json');
const kodeJurusan = require('./json/kode_jurusan.json');
const kodeFakultas = require('./json/kode_fakultas.json');
const listJurusan = require('./json/list_jurusan.json');
const listFakultas = require('./json/list_fakultas.json');

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

const getKodeFakultas = (namaFakultas) => {
  // mengembalikan kode fakultas dari nama fakultas
  // for kode_fakultas.json
  for (const [key, value] of Object.entries(kodeFakultas)) {
    if (key.toLowerCase() === namaFakultas.toLowerCase()) {
      return value;
    }
  }
  return -1;
};

const getKodeListFakultas = (namaFakultas) => {
  // for list_fakultas.json
  for (const [key, value] of Object.entries(listFakultas)) {
    if (value.toLowerCase().includes(namaFakultas.toLowerCase())) {
      return key;
    }
  }
  return -1;
};

const getKodeJurusan = (namaJurusan) => {
  // mengembalikan kode jurusan dari nama jurusan
  // for kode_jurusan.json
  for (const [key, value] of Object.entries(kodeJurusan)) {
    if (key.toLowerCase() === namaJurusan.toLowerCase()) {
      return value;
    }
  }
  return -1;
};

const getKodeListJurusan = (namaJurusan) => {
  // for list_jurusan.json
  for (const [key, value] of Object.entries(listJurusan)) {
    if (value.toLowerCase().includes(namaJurusan.toLowerCase())) {
      return key;
    }
  }
  return -1;
};
function App() {
  const [query, setQuery] = useState('');
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

            const plainQueryAsPattern = new RegExp(query.toLowerCase());
            const searchMethod = 0;

            const byNim = new RegExp(/\d{3,8}/);
            const byName = new RegExp(/([a-zA-Z]{3,}\s?)+/);

            const byNimName = new RegExp(/\d{3,8}\s([a-zA-Z]{3,}\s?)+/);
            const byNameNim = new RegExp(/([a-zA-Z]{3,}\s?)+\d{3,8}/);

            const byMajorname = new RegExp(/([a-zA-Z]{2,}\s?)+/);

            const byMajorYear = new RegExp(/([a-zA-Z]{2,}\s?)+\d{2}/)

            const byNameMajorYearNim = new RegExp(/([a-zA-Z]{2,}\s?)+\d{2}\s\d{3}/)
            const byMajorYearNameNim = new RegExp(/([a-zA-Z]{2}\s?)+\d{2}\s([a-zA-Z]{3,}\s?)+\d{3}/)

            if (byNim.test(query)) {
              // query nim
              if (
                plainQueryAsPattern.test(nimFakultas) ||
                plainQueryAsPattern.test(nimJurusan)
              ) {
                // kembalikan data yang memiliki nim yang sama dengan query
                console.log('byNim');
                this.count++;
                return val;
              }
            }
            if (byName.test(query)) {
              // query nama
              // query <nama> <jurusan/fakultas> dengan jurusan/fakultas berupa 1 kata
              // query <jurusan/fakultas> dengan jurusan/fakultas lebih dari 1 kata
              
              if (
                getKodeListFakultas(query) !== -1 ||
                getKodeListJurusan(query) !== -1
              ) {
                const nimPattern1 = new RegExp(getKodeListFakultas(query));
                const nimPattern2 = new RegExp(getKodeListJurusan(query));

                if (
                  (nimPattern1.test(nimFakultas) ||
                  nimPattern2.test(nimJurusan))
                ) {
                  console.log("byListmajorname")
                  this.count++;
                  return val;
                }
              }

              const splittedQuery = query.split(' ');
              const majorname = splittedQuery[splittedQuery.length - 1];
              const namePattern = new RegExp(splittedQuery.slice(0,-1).join(" "))

              if (
                getKodeListFakultas(majorname) !== -1 ||
                getKodeListJurusan(majorname) !== -1
              ) {
                const nimPattern1 = new RegExp(getKodeListFakultas(majorname));
                const nimPattern2 = new RegExp(getKodeListJurusan(majorname));

                if (
                  (nimPattern1.test(nimFakultas) ||
                  nimPattern2.test(nimJurusan)) && namePattern.test(nama.toLowerCase())
                ) {
                  console.log("byNameMajorname")
                  this.count++;
                  return val;
                }
              }
              

              if (plainQueryAsPattern.test(nama.toLowerCase())) {
                console.log('byName');
                this.count++;
                return val;
              }
            }
            
            if (byMajorYear.test(query)) {
              const splittedQuery = query.split(' ')
              const year = splittedQuery[splittedQuery.length - 1]
              const majorname = splittedQuery.slice(0,-1).join(" ")

                // dapetin kode jurusan/fakultas
                // const nimPattern1 = new RegExp("\\d{3}" + year + "\\d{3}");

                const nimPattern1 = new RegExp(getKodeListFakultas(majorname));
                const nimPattern2 = new RegExp(getKodeListJurusan(majorname));
                const nimPattern3 = new RegExp(getKodeFakultas(majorname))
                const nimPattern4 = new RegExp(getKodeJurusan(majorname))

                // if dapet nim pattern 135
                const finalPattern1 = new RegExp(getKodeListFakultas(majorname) + year)
                const finalPattern2 = new RegExp(getKodeListJurusan(majorname) + year)
                const finalPattern3 = new RegExp(getKodeFakultas(majorname) + year)
                const finalPattern4 = new RegExp(getKodeJurusan(majorname) + year)

                if (
                  (finalPattern1.test(nimFakultas) ||
                  finalPattern2.test(nimJurusan) || finalPattern3.test(nimFakultas) ||
                  finalPattern4.test(nimJurusan)) 
                ) {
                  console.log("byMajorYear")
                  this.count++;
                  return val;
                }
            }

            if (byNimName.test(query)) {
              // query <nim> <nama>
              const splittedQuery = query.split(' ');
              const nimPattern = new RegExp(splittedQuery[0]);
              const namePattern = new RegExp(splittedQuery.slice(1).join(' '));

              if (
                (nimPattern.test(nimFakultas) || nimPattern.test(nimJurusan)) &&
                namePattern.test(nama.toLowerCase())
              ) {
                console.log('byNimName');
                this.count++;
                return val;
              }
            }
            if (byNameNim.test(query)) {
              // query <nama> <nim>
              const splittedQuery = query.split(' ');
              const nimPattern = new RegExp(
                splittedQuery[splittedQuery.length - 1]
              );
              const namePattern = new RegExp(
                splittedQuery.slice(0, -1).join(' ')
              );

              if (
                (nimPattern.test(nimFakultas) || nimPattern.test(nimJurusan)) &&
                namePattern.test(nama.toLowerCase())
              ) {
                console.log('byNameNim');
                this.count++;
                return val;
              }
            }

            // TODO: bikin input jurusan ex. informatika matematika dari list_fakultas.json and list_jurusan.json

            if (byMajorname.test(query)) {
              // input jurusan. ex: IF MA
              const splittedQuery = query.split(' ');
              const majorQuery = splittedQuery[splittedQuery.length - 1];
              // const namePattern = new RegExp(
              //   splittedQuery.slice(0, -1).join(" ")
              // );

              if (
                getKodeFakultas(majorQuery) !== -1 ||
                getKodeJurusan(majorQuery) !== -1
              ) {
                const nimPattern1 = new RegExp(getKodeJurusan(majorQuery));
                const nimPattern2 = new RegExp(getKodeFakultas(majorQuery));
                if (
                  nimPattern2.test(nimFakultas) ||
                  nimPattern1.test(nimJurusan)
                ) {
                  console.log('byMajorname');
                  this.count++;
                  return val;
                }
              }
            }

            if (byNameMajorYearNim.test(query)) {
              const splittedQuery = query.split(' ')
              const nim = splittedQuery[splittedQuery.length-1]
              const year = splittedQuery[splittedQuery.length-2]
              const majorname = splittedQuery[splittedQuery.length-3]

              const namePattern = new RegExp(splittedQuery.slice(0,-3).join(' ').toLowerCase());

              const nimPattern1 = new RegExp(getKodeListFakultas(majorname));
              const nimPattern2 = new RegExp(getKodeListJurusan(majorname));
              const nimPattern3 = new RegExp(getKodeFakultas(majorname))
              const nimPattern4 = new RegExp(getKodeJurusan(majorname))

              // if dapet nim pattern 135 year nim
              const finalPattern1 = new RegExp(getKodeListFakultas(majorname) + year + nim)
              const finalPattern2 = new RegExp(getKodeListJurusan(majorname) + year + nim)
              const finalPattern3 = new RegExp(getKodeFakultas(majorname) + year + nim)
              const finalPattern4 = new RegExp(getKodeJurusan(majorname) + year + nim)

              if (
                (finalPattern1.test(nimFakultas) ||
                finalPattern2.test(nimJurusan) || finalPattern3.test(nimFakultas) ||
                finalPattern4.test(nimJurusan)) && namePattern.test(nama.toLowerCase())
              ) {
                console.log("byNameMajorYearNim")
                this.count++;
                return val;
              }
            }
            // REGEX EXPRESSIONNYA PAKE LOWER CASE
            if (byMajorYearNameNim.test(query)) {
              const splittedQuery = query.split(' ')
              const nim = splittedQuery[splittedQuery.length-1]
              const year = splittedQuery[1]
              const majorname = splittedQuery[0]

              const namePattern = new RegExp(splittedQuery.slice(2,-1).join(' ').toLowerCase());

              const nimPattern1 = new RegExp(getKodeListFakultas(majorname));
              const nimPattern2 = new RegExp(getKodeListJurusan(majorname));
              const nimPattern3 = new RegExp(getKodeFakultas(majorname))
              const nimPattern4 = new RegExp(getKodeJurusan(majorname))

              // if dapet nim pattern 135 year nim
              const finalPattern1 = new RegExp(getKodeListFakultas(majorname) + year + nim)
              const finalPattern2 = new RegExp(getKodeListJurusan(majorname) + year + nim)
              const finalPattern3 = new RegExp(getKodeFakultas(majorname) + year + nim)
              const finalPattern4 = new RegExp(getKodeJurusan(majorname) + year + nim)

              if (
                (finalPattern1.test(nimFakultas) ||
                finalPattern2.test(nimJurusan) || finalPattern3.test(nimFakultas) ||
                finalPattern4.test(nimJurusan)) && namePattern.test(nama.toLowerCase())
              ) {
                console.log("byNameMajorYearNim")
                this.count++;
                return val;
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
                {val[0]}{' '}
                <span className="jurusan">
                  <span className="nim">
                    {val[1]} {val.length === 3 && val[2]}{' '}
                  </span>
                  {val.length === 3
                    ? getJurusan(val[2].toString().slice(0, 3))
                    : getFakultas(val[1].toString().slice(0, 3))}
                </span>
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
