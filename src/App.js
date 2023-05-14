import './App.css';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";

function App() {
  const [dataFetched, setDataFetched] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [freqArr, setFreqArr] = useState([]);
  const [csvFile, setCsvFile] = useState([]);
  const [isGraph, setIsGraph] = useState(false);

  const fileName = "chartData.csv";

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      setDataFetched(response.data);
    }
    getData();
  })

  const countWords = (wordArr) => {
    const frequency = {};
    for (let i = 0; i < wordArr.length; i++) {
      if (frequency[wordArr[i]]) {
        frequency[wordArr[i]]++;
      }
      else {
        frequency[wordArr[i]] = 1;
      }
    }
    const sortedArray = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => `${word}: ${count}`);
    return sortedArray;
  };

  const genrateChart = () => {
    let wordArr = dataFetched.match(/[a-zA-Z]+/g);
    const sortedFrequencyArray = countWords(wordArr);
    const csvData = [
      ["Words", "Frequency"]
    ];
    var w = [], f = [];
    for (let i = 0; i < 20; i++) {
      const tempArr = sortedFrequencyArray[i].split(':');
      w.push(tempArr[0]);
      f.push(parseInt(tempArr[1]));
      csvData.push([tempArr[0], tempArr[1]]);
    }
    setFreqArr(f);
    setWordArr(w);
    setIsGraph(true);
    setCsvFile(csvData);
  }

  var data = {
    series: [
      {
        name: "Word Frequency",
        data: freqArr,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        },

      },
      title: {
        text: "Histogram of the 20 most occurring word",
        style: { color: "black", fontSize: 25 },
        position: "center",
      },

      subtitle: {
        text: "Frequency of occurrence of each word",
        style: { color: "black", fontSize: 15 },

      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      dataLabels: { enabled: false },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: "100%",
          strokeWidth: 1,
          borderRadiusApplication: "end",
          dataLabels: {
            position: 'top',
          },
        }
      },
      stroke: {
        width: 2,
        colors: ["#ee8080"]
      },
      fill: {
        colors: "#FF6969",
        opacity: 0.5
      },

      xaxis: {
        categories: wordArr,
        labels: {
          style: { colors: "black", fontSize: 13, },
        },
        title: {
          text: "Words",
          style: { color: "black", fontSize: 30 },
        },
      },

      yaxis: {
        max: 30,
        labels: {
          style: { colors: "black", fontSize: "15" },
        },
        title: {
          text: "Frequency of Words",
          style: { color: "black", fontSize: 15 },
        },
      }
    }
  }

  return (
    <>
      {
        isGraph === false ?
          (<div className='home'>
            <button className='glow-on-hover' onClick={genrateChart}>Submit</button>
            <div className='submit-tag'>
              <p>Project Submitted By: Deepak Tanwer</p>
              <a href='https://github.com/dtanwer' target='_blank' rel="noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/3291/3291695.png" width="32" height="32" alt="Github"></img>
              </a>
              <a href='https://www.linkedin.com/in/dtanwer/' target='_blank' rel="noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="32" height="32" alt="LinkedIn"></img>
              </a>
            </div>
          </div>) :
          (<div className='chart'>
            <button className="btn">
              <CSVLink data={csvFile} filename={fileName} className="csv-tag">Export</CSVLink>
            </button>
            <Chart
              type="bar"
              width="100%"
              height={600}
              series={data.series}
              options={data.options} />

          </div>)
      }
    </>
  );
}

export default App;
