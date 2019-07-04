import React from "react";

const transform = array => {
  let newInput = [];
  while (array.length > 0) newInput.push(array.splice(0, 4));
  return newInput;
};

function App() {
  const [output, setOutput] = React.useState([]);
  const [input, setInput] = React.useState([
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 0]
  ]);

  const toggle = (value, index, idx) => {
    let newInput = [...input];
    newInput[index][idx] = value === "0" ? 1 : 0;
    setInput(newInput);
  };

  const getOutput = () => {
    let tOutput = [];
    const tInput = input.flat();
    tInput.forEach((item, i) => {
      if (item === 1) {
        tOutput[i] = 9;
      } else {
        let count = [];
        if (i % 4 === 0) {
          if (i + 1 < tInput.length) {
            count.push(tInput[i + 1]);
          }

          if (i - 4 > -1) {
            count.push(...tInput.slice(i - 4).slice(0, 2));
          }
          if (i + 4 < tInput.length) {
            count.push(...tInput.slice(i + 4).slice(0, 2));
          }
        }

        if (i % 4 === 1 || i % 4 === 2) {
          if (i - 1 > -1) {
            count.push(tInput[i - 1]);
          }
          if (i + 1 < tInput.length) {
            count.push(tInput[i + 1]);
          }

          if (i - 5 > -1) {
            count.push(...tInput.slice(i - 5).slice(0, 3));
          }
          if (i + 3 < tInput.length) {
            count.push(...tInput.slice(i + 3).slice(0, 3));
          }
        }

        if (i % 4 === 3) {
          if (i - 1 > -1) {
            count.push(tInput[i - 1]);
          }

          if (i - 5 > -1) {
            count.push(...tInput.slice(i - 5).slice(0, 2));
          }
          if (i + 3 < tInput.length) {
            count.push(...tInput.slice(i + 3).slice(0, 2));
          }
        }
        tOutput[i] = count.filter(it => it === 1).length;
      }
    });
    setOutput(tOutput);
  };

  return (
    <div className="App">
      Add mines:
      <table>
        <tbody>
          {input.map((item, index) => (
            <tr key={index}>
              {item.map((data, idx) => (
                <td key={idx}>
                  <button
                    onClick={e => toggle(e.target.value, index, idx)}
                    value={data}
                  >
                    {data}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={getOutput}>Get output</button>
      <br />
      <br />
      <table>
        <tbody>
          {output.length > 0 &&
            transform(output).map((item, index) => (
              <tr key={index}>
                {item.map((data, idx) => (
                  <td key={idx}>
                    <button>{data}</button>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
