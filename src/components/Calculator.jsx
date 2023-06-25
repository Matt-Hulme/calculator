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
    const lastCharacter = equation.trim().slice(-1);
    setEquation((prevEquation) => {
      let newEquation;
      if (/[^\d.]$/.test(prevEquation)) {
        if (lastCharacter === '%' || lastCharacter === ')') {
          newEquation = prevEquation + ' * ' + number;
        } else {
          newEquation = prevEquation + ` ${number}`;
        }
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

  // const handleLParenth = () => {
  //   const lastCharacter = equation.slice(-1);
  //   const operators = ["+", "-", "*", "/"];
  //   const decimalRegex = /\d+\.\d*$/;
  
  //   if (
  //     lastCharacter === "" ||
  //     lastCharacter === "(" ||
  //     operators.includes(lastCharacter) ||
  //     decimalRegex.test(lastCharacter)
  //   ) {
  //     setEquation((prevEquation) => prevEquation + "(");
  //   }
  // };
  
  // const handleRParenth = () => {
  //   const lastCharacter = equation.slice(-1);
  //   const operators = ["+", "-", "*", "/"];
  //   const decimalRegex = /\d+\.\d*$/;
  
  //   if (
  //     lastCharacter !== "" &&
  //     lastCharacter !== "(" &&
  //     !operators.includes(lastCharacter) &&
  //     !decimalRegex.test(lastCharacter)
  //   ) {
  //     setEquation((prevEquation) => prevEquation + ")");
  //   }
  // };
  
  
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
      const operator = lastCharacter === ' ' || lastCharacter === ')' ? '+' : ' +';
      setEquation((prevEquation) => {
        const newEquation = prevEquation + ' ' + operator;
        if (/[\d.)]$/.test(prevEquation)) {
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
      const operator = lastCharacter === ' ' || lastCharacter === ')' ? '-' : ' -';
      setEquation((prevEquation) => {
        const newEquation = prevEquation + ' ' + operator;
        if (/[\d.)]$/.test(prevEquation)) {
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
      const operator = lastCharacter === ' ' || lastCharacter === ')' ? '*' : ' *';
      setEquation((prevEquation) => {
        const newEquation = prevEquation + ' ' + operator;
        if (/[\d.)]$/.test(prevEquation)) {
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
      const operator = lastCharacter === ' ' || lastCharacter === ')' ? '/' : ' /';
      setEquation((prevEquation) => {
        const newEquation = prevEquation + ' ' + operator;
        if (/[\d.)]$/.test(prevEquation)) {
          return newEquation;
        }
        return prevEquation;
      });
      setInput(0);
    }
  };
  


  const handleXSquared = () => {
    setEquation((prevEquation) => {
      const equationArray = prevEquation.split(' ');
      const lastInputIndex = equationArray.length - 1;
      const lastInput = equationArray[lastInputIndex];
      let newEquation;
      if (!isNaN(parseFloat(lastInput))) {
        const newLastInput = (`(${lastInput} ^ 2)`);
        equationArray[lastInputIndex] = newLastInput;
        newEquation = equationArray.join(' ');
        setResult(evaluate(newEquation));
      } else {
        newEquation = prevEquation;
      }
      return newEquation;
    });
  };

  const handleInverseX = () => {
    setEquation((prevEquation) => {
      const equationArray = prevEquation.split(' ');
      const lastInputIndex = equationArray.length - 1;
      const lastInput = equationArray[lastInputIndex];
      let newEquation;
      if (!isNaN(parseFloat(lastInput))) {
        const newLastInput = (`(1/${lastInput})`);
        equationArray[lastInputIndex] = newLastInput;
        newEquation = equationArray.join(' ');
        setResult(evaluate(newEquation));
      } else {
        newEquation = prevEquation;
      }
      return newEquation;
    });
  };


  // const handleRootX = () => {
  //   setEquation((prevEquation) => {
  //     const equationArray = prevEquation.split(' ');
  //     const lastInputIndex = equationArray.length - 1;
  //     const lastInput = equationArray[lastInputIndex];
  //     let newEquation;
  //     if (!isNaN(parseFloat(lastInput))) {
  //       const newLastInput = Math.sqrt(parseFloat(lastInput)).toString();
  //       equationArray[lastInputIndex] = newLastInput;
  //       newEquation = equationArray.join(' ');
  //       setResult(evaluate(newEquation));
  //     } else {
  //       newEquation = prevEquation;
  //     }
  //     return newEquation;
  //   });
  // };


  const handleNegate = () => {
    setEquation((prevEquation) => {
      const equationArray = prevEquation.split(' ');
      const lastInputIndex = equationArray.length - 1;
      const lastInput = equationArray[lastInputIndex];
      let newEquation;
      if (!isNaN(parseFloat(lastInput))) {
        const newLastInput = (-parseFloat(lastInput)).toString();
        equationArray[lastInputIndex] = newLastInput;
        newEquation = equationArray.join(' ');
        setInput(-parseFloat(lastInput));
        setResult(evaluate(newEquation));
      } else {
        newEquation = prevEquation;
      }
      return newEquation;
    });
  };


  const handlePercentage = () => {
    setEquation((prevEquation) => {
      let newEquation = prevEquation.trim();
      const lastCharacter = newEquation.slice(-1);
      if (lastCharacter === '%') {
        newEquation = newEquation.slice(0, -1);
      } else if (/[^\d.]$/.test(newEquation)) {
        newEquation += ' %';
      } else {
        const equationArray = newEquation.split(' ');
        const lastInputIndex = equationArray.length - 1;
        const lastInput = equationArray[lastInputIndex];
        if (!isNaN(parseFloat(lastInput))) {
          const newLastInput = `${lastInput}%`;
          equationArray[lastInputIndex] = newLastInput;
          newEquation = equationArray.join(' ');
        }
      }
      setResult(evaluate(newEquation));
      return newEquation;
    });
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
        <Button label="(" onClick = {() => handleLParenth()}></Button>
        <Button label=")"onClick = {() => handleRParenth()}></Button>
        <Button label="Backspace" onClick={() => handleBackspace()}></Button>
        <Button label="1/X" onClick={() => handleInverseX()}></Button>
        <Button label="X^2" onClick={() => handleXSquared()}></Button>
        <Button label="√X" onClick={() => handleRootX()}></Button>
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