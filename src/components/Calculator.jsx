import React, { useState } from 'react';
import Button from './Button.jsx';

export default function Calculator() {
  const [input, setInput] = useState(0);
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState(0);

  const handleNumeric = (number) => {
    setInput((prevInput) => prevInput * 10 + number);
  };

  const handleCE = () => {
    setInput(0);
  };

  const handleC = () => {
    setInput(0);
    setResult(0);
    setEquation('');
  };

  const handleBackspace = () => {
    setInput((prevInput) => {
      let inputString = prevInput.toString();
      let newInputString = inputString.slice(0, -1);
      return newInputString ? parseFloat(newInputString) : 0;
    });
  };

  const handleMultiply = () => {
    setInput(0);
    setEquation((prevEquation) => prevEquation.concat(` ${input} * `));
  };

  const handleDivide = () => {
    setInput(0);
    setEquation((prevEquation) => prevEquation.concat(` ${input} / `));
  };

  const handleSubtract = () => {
    setInput(0);
    setEquation((prevEquation) => prevEquation.concat(` ${input} - `));
  };

  const handleAdd = () => {
    setInput(0);
    setEquation((prevEquation) => prevEquation.concat(` ${input} + `));
  };

  const handleNegate = () => {
    setInput((prevInput) => prevInput * -1);
  };

  const handleDecimal = () => {
    if (Number.isInteger(input)) {
      setInput((prevInput) => prevInput + '.');
    }
  };

  const handleEquals = () => {
    setEquation((prevEquation) => {
      const updatedEquation = prevEquation + input;
      const evalResult = new Function('return ' + updatedEquation)();
      setResult(evalResult);
      setInput(evalResult);
      return updatedEquation;
    });
  };
  
  return (
    <div className="Calculator">
      Calculator
      <div className="Screen">
        {input}
        <div className="ScreenEquation">{equation}</div>
      </div>
      <div className="MemoryRow">Memory Row</div>
      <div className="ButtonsGrid">
        <Button label="Percentage" onClick={() => handlePercentage()}></Button>
        <Button label="CE" onClick={() => handleCE()}></Button>
        <Button label="C" onClick={() => handleC()}></Button>
        <Button label="Backspace" onClick={() => handleBackspace()}></Button>
        <Button label="1/X" onClick={() => handleOneByX()}></Button>
        <Button label="Squared" onClick={() => handleSquared()}></Button>
        <Button label="RootX" onClick={() => handleRootX()}></Button>
        <Button label="/" onClick={() => handleDivide()}></Button>
        <Button label="7" onClick={() => handleNumeric(7)}></Button>
        <Button label="8" onClick={() => handleNumeric(8)}></Button>
        <Button label="9" onClick={() => handleNumeric(9)}></Button>
        <Button label="*" onClick={() => handleMultiply()}></Button>
        <Button label="4" onClick={() => handleNumeric(4)}></Button>
        <Button label="5" onClick={() => handleNumeric(5)}></Button>
        <Button label="6" onClick={() => handleNumeric(6)}></Button>
        <Button label="-" onClick={() => handleSubtract()}></Button>
        <Button label="1" onClick={() => handleNumeric(1)}></Button>
        <Button label="2" onClick={() => handleNumeric(2)}></Button>
        <Button label="3" onClick={() => handleNumeric(3)}></Button>
        <Button label="+" onClick={() => handleAdd()}></Button>
        <Button label="+-" onClick={() => handleNegate()}></Button>
        <Button label="0" onClick={() => handleNumeric(0)}></Button>
        <Button label="." onClick={() => handleDecimal()}></Button>
        <Button label="=" onClick={() => handleEquals()}></Button>
      </div>
    </div>
  );
}
