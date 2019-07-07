import React, { useState } from "react";

const transform = array => {
  let newInput = [];
  const n = Math.sqrt(array.length);
  while (array.length > 0) newInput.push(array.splice(0, n));
  return newInput;
};

const initialInput = (mineLevel, value) => {
  let temp = [];
  for (let i = 0; i < mineLevel; i += 1) {
    temp.push(value);
  }
  return temp;
};

function App() {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState([]);

  const initialize = mineLevel => {
    if (mineLevel < 100) {
      setInput(initialInput(mineLevel, initialInput(mineLevel, 0)));
    }
  };

  const toggle = (value, index, idx) => {
    let newInput = [];
    for (let i = 0, len = input.length; i < len; i++) {
      newInput[i] = input[i].slice();
    }
    newInput[index][idx] = 0 + (value === "0");
    setInput(newInput);
  };

  const getOutput = () => {
    let flatOutput = [];
    const flatInput = input.flat();
    const n = Math.sqrt(flatInput.length);
    const upperBound = index => index < flatInput.length;
    const lowerBound = index => index > -1;
    flatInput.forEach((item, i) => {
      let count = 0;
      if (item) {
        flatOutput[i] = 9;
      } else {
        switch (i % n) {
          case 0: {
            const right = i + 1;
            const top = i - n;
            const bottom = i + n;
            if (upperBound(right)) {
              count += flatInput[right];
            }

            if (lowerBound(top)) {
              count += flatInput[top] + flatInput[top + 1];
            }
            if (upperBound(bottom)) {
              count += flatInput[bottom] + flatInput[bottom + 1];
            }
            break;
          }

          case n - 1: {
            const left = i - 1;
            const top = i - (n + 1);
            const bottom = i + (n - 1);
            if (lowerBound(left)) {
              count += flatInput[left];
            }

            if (lowerBound(top)) {
              count +=
                flatInput[top] + flatInput[top + 1];
            }
            if (upperBound(bottom)) {
              count += flatInput[bottom] + flatInput[bottom + 1];
            }
            break;
          }

          default: {
            const left = i - 1;
            const right = i + 1;
            const top = i - (n + 1);
            const bottom = i + (n - 1);
            if (lowerBound(left)) {
              count += flatInput[left];
            }

            if (upperBound(right)) {
              count += flatInput[right];
            }

            if (lowerBound(top)) {
              count += flatInput[top] + flatInput[top + 1] + flatInput[top + 2];
            }
            if (upperBound(bottom)) {
              count +=
                flatInput[bottom] +
                flatInput[bottom + 1] +
                flatInput[bottom + 2];
            }
          }
        }
        flatOutput[i] = count;
      }
    });
    setOutput(flatOutput);
  };

  return (
    <div className="App">
      <div>
        <label>
          <strong>Enter mine level:</strong>
        </label>{" "}
        <input onChange={e => initialize(e.target.value)} />
      </div>
      {input.length > 0 && <strong>Add mines:</strong>}
      <table>
        <tbody>
          {input.map((item, index) => (
            <tr key={index}>
              {item.map((data, idx) => (
                <td key={idx}>
                  <button
                    value={data}
                    onClick={e => toggle(e.target.value, index, idx)}
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
      {input.length > 0 && <button onClick={getOutput}>Get output</button>}
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
