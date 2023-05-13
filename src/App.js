import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function App() {
  const [str, setStr] = useState("");
  const [words, setwords] = useState([]);
  const [freq, setfreq] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get('https://www.terriblytinytales.com/test.txt');
      setStr(data.data);
    }

    getData();
  })
  const countWords = (words) => {
    const frequency = {};
    for (let i = 0; i < words.length; i++) {
      if (frequency[words[i]]) {
        frequency[words[i]]++;
      } else {
        frequency[words[i]] = 1;
      }
    }
    const sortedArray = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => `${word}: ${count}`);
    return sortedArray;
  };
  const myFun = () => {
    let words = str.match(/[a-zA-Z]+/g);
    const ans = countWords(words);
    var w = [];
    var f = [];
    for (let i = 0; i < 20; i++) {
      const temp = ans[i].split(':');
      w.push(temp[0]);
      f.push(parseInt(temp[1]));
    }
    setfreq(f);
    setwords(w);
  }
  return (
    <div className="App">
      <h1>I m Deep</h1>
      <button onClick={myFun}>CLick me</button>

      <Chart
        type="bar"
        width={1000}
        height={600}
        series={[
          {
            name: "Word Frequency",
            data: freq,
          },
        ]}
        options={{
          title: {
            text: "My Chart",
            style: { fontSize: 20 },
          },
          xaxis: {
            tickPlacement: "on",
            categories:words,
            title: {
              text: "Words",
            },
          },

          yaxis: {
            title: {
              text: "Frequencys",
            },
          },
        }}
      ></Chart>
    </div>
  );
}

export default App;
