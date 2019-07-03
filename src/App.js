import React from "react";

const transform = array => {
  let newInput = [];
  while (array.length > 0) newInput.push(array.splice(0, 4));
  return newInput;
};

function App() {
  const [output, setOutput] = React.useState([]);
  const [input, setInput] = React.useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);

  const toggle = (value, index, idx) => {
    let newInput = [...input];
    newInput[index][idx] = value === "0" ? 1 : 0;
    setInput(newInput);
  };

  const getOutput = () => {
    const checkBound = idx => idx > -1 && idx < input.length;

    const compute = (i, j) =>
      0 +
      (checkBound(i - 1) && checkBound(j - 1) && input[i - 1][j - 1] === 1) +
      (checkBound(i - 1) && input[i - 1][j] === 1) +
      (checkBound(i - 1) && checkBound(j + 1) && input[i - 1][j + 1] === 1) +
      (checkBound(j - 1) && input[i][j - 1] === 1) +
      (checkBound(j + 1) && input[i][j + 1] === 1) +
      (checkBound(i + 1) && checkBound(j - 1) && input[i + 1][j - 1] === 1) +
      (checkBound(i + 1) && input[i + 1][j] === 1) +
      (checkBound(i + 1) && checkBound(j + 1) && input[i + 1][j + 1] === 1);

    let tOutput = [];
    input.forEach((subArray, i) => {
      subArray.forEach((item, j) => {
        let value = 0;
        if (item === 1) {
          value = 9;
        } else {
          value = compute(i, j);
        }
        tOutput.push(value);
      });
    });
    setOutput(tOutput);
  };

  return (
    <div className="App">
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
      <button onClick={getOutput}>Get output</button>
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
