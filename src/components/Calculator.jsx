import React, { useState, } from 'react';
import Button from './Button.jsx';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const [ input, setInput] = useState(0);
  const [ result, setResult] = useState(0);
  const [ equation, setEquation] = useState('');
  const [ history, setHistory] = useState([]);

  const handleNumeric = (number) => {
    setInput((prevInput) => {
      let newInput;
      if (prevInput === 0 || !prevInput.toString().includes('.')) {
        newInput = prevInput * 10 + number;
      } else {
        newInput = parseFloat(prevInput.toString() + number.toString());
      }
      return newInput;
    });
  
    setEquation((prevEquation) => {
      let newEquation;
      if (/[^\d.]$/.test(prevEquation)) {
        newEquation = prevEquation + ' ' + number;
      } else {
        const trimmedEquation = prevEquation.trimEnd();
        newEquation = trimmedEquation + number;
      }
      setResult(evaluate(newEquation));
      return newEquation;
    });
  };
  
  const handleDecimal = () => {
    if (input === 0){
      setInput((prevInput) => prevInput + '.');
      setEquation((prevEquation) => prevEquation + '0.')
    }
    else if (Number.isInteger(input)) {
      setInput((prevInput) => prevInput + '.');
      setEquation((prevEquation) => prevEquation + '.')
    }
  };
  
  const handleC = () => {
    setInput(0);
    setResult(0);
    setEquation('');
  };

  const handleBackspace = () => {
    setInput((prevInput) => {
      const inputString = prevInput.toString();
      const newInputString = inputString.slice(0, -1);
      const newInput = newInputString ? parseFloat(newInputString) : 0;
      return newInput;
    });
    setEquation((prevEquation) => {
      const lastCharacter = prevEquation.slice(-1);
      let newEquation;
      if (lastCharacter && /\W/.test(lastCharacter)) {
        newEquation = prevEquation.slice(0, -2);
      } else {
        newEquation = prevEquation.slice(0, -1);
        }
        if (newEquation) {
          try {
            setResult(evaluate(newEquation));
          } catch (error) {
            setResult(0);
          }
        } else {
          setResult(0);
        }
        return newEquation;
      });
  };

  const handleAdd = () => {
    if (equation.length !== 0) {
      const lastCharacter = equation.slice(-1);
      const operator = lastCharacter === ' ' ? '+' : ' +';
      setEquation((prevEquation) => {
        const trimmedEquation = prevEquation.trimEnd();
        const newEquation = trimmedEquation + operator;
        if (/[\d.]$/.test(trimmedEquation)) {
          return newEquation;
        }
        return prevEquation;
      });
      setInput(0);
    }
  };

  const handleSubtract = () => {
    if (equation.length !== 0) {
      const lastCharacter = equation.slice(-1);
      const operator = lastCharacter === ' ' ? '-' : ' -';
      setEquation((prevEquation) => {
        const trimmedEquation = prevEquation.trimEnd();
        const newEquation = trimmedEquation + operator;
        if (/[\d.]$/.test(trimmedEquation)) {
          return newEquation;
        }
        return prevEquation;
      });
      setInput(0);
    }
  };
  
  const handleMultiply = () => {
    if (equation.length !== 0) {
      const lastCharacter = equation.slice(-1);
      const operator = lastCharacter === ' ' ? '*' : ' *';
      setEquation((prevEquation) => {
        const trimmedEquation = prevEquation.trimEnd();
        const newEquation = trimmedEquation + operator;
        if (/[\d.]$/.test(trimmedEquation)) {
          return newEquation;
        }
        return prevEquation;
      });
      setInput(0);
    }
  };
  
  const handleDivide = () => {
    if (equation.length !== 0) {
      const lastCharacter = equation.slice(-1);
      const operator = lastCharacter === ' ' ? '/' : ' /';
      setEquation((prevEquation) => {
        const trimmedEquation = prevEquation.trimEnd();
        const newEquation = trimmedEquation + operator;
        if (/[\d.]$/.test(trimmedEquation)) {
          return newEquation;
        }
        return prevEquation;
      });
      setInput(0);
    }
  };

  const handleNegate = () => {
  };

  const handleEquals = () => {
  };
  

  return (
    <div className="Calculator">
      Calculator
      <div className="Screen">
        <div className="ScreenResult">{result}</div>
        <div className="ScreenEquation">{equation}</div>
        <div className="InputDisplay">{input}</div>
      </div>
      <div className="MemoryRow">Memory Row</div>
      <div className ="ClearRow" onClick={() => handleC()}>Clear</div>
      <div className="ButtonsGrid">
        <Button label="%" onClick={() => handlePercentage()}></Button>
        <Button label="("></Button>
        <Button label=")"></Button>
        <Button label="Backspace" onClick={() => handleBackspace()}></Button>
        <Button label="1/X" onClick={() => handleOneByX()}></Button>
        <Button label="X^2" onClick={() => handleSquared()}></Button>
        <Button label="2√X" onClick={() => handleRootX()}></Button>
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