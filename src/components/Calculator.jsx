import { useEffect, useState } from 'react';
import Button from './Button.jsx';

function calculate(firstValue, secondValue, operator) {
  let result;

  switch (operator) {
    case '+':
      result = firstValue + secondValue;
      break;
    case '-':
      result = firstValue - secondValue;
      break;
    case '*':
      result = firstValue * secondValue;
      break;
    case '/':
      if (secondValue === 0) return null;
      result = firstValue / secondValue;
      break;
    default:
      return null;
  }

  if (!Number.isFinite(result)) return null;
  return String(Number(result.toPrecision(12)));
}

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  function handleDigit(digit) {
    if (display === 'Error' || waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }

  function handleDecimal() {
    if (display === 'Error' || waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }

  function handleOperator(nextOperator) {
    if (display === 'Error') return;

    const currentValue = Number(display);
    if (operator && !waitingForOperand) {
      const result = calculate(storedValue, currentValue, operator);
      if (result === null) {
        setDisplay('Error');
        setStoredValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
      setStoredValue(Number(result));
      setDisplay(result);
    } else if (storedValue === null) {
      setStoredValue(currentValue);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  }

  function handleEquals() {
    if (!operator || storedValue === null || waitingForOperand || display === 'Error') return;

    const result = calculate(storedValue, Number(display), operator);
    setDisplay(result === null ? 'Error' : result);
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }

  function handleClear() {
    setDisplay('0');
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }

  function handleBackspace() {
    if (display === 'Error') {
      handleClear();
      return;
    }
    if (waitingForOperand) return;

    const shortened = display.slice(0, -1);
    setDisplay(!shortened || shortened === '-' ? '0' : shortened);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const { key } = event;

      if (/^[0-9]$/.test(key)) {
        handleDigit(key);
      } else if (key === '.') {
        handleDecimal();
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Backspace') {
        event.preventDefault();
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, handleBackspace, handleClear, handleDecimal, handleDigit, handleEquals, handleOperator, operator, storedValue, waitingForOperand]);

  const operationLabel = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  const expression = operator && storedValue !== null
    ? `${storedValue} ${operationLabel[operator]}${waitingForOperand ? '' : ` ${display}`}`
    : 'DISPLAY';

  return (
    <section className="calculator" aria-label="Calculator">
      <div className="calculator-display" aria-live="polite" aria-atomic="true">
        <span className="calculator-display__label">{expression}</span>
        <output className="calculator-display__value">{display}</output>
      </div>

      <div className="calculator-keys">
        <Button label="C" tone="clear" onClick={handleClear} />
        <Button label="⌫" tone="utility" onClick={handleBackspace} ariaLabel="Backspace" />
        <Button label="÷" tone="operator" onClick={() => handleOperator('/')} />
        <Button label="×" tone="operator" onClick={() => handleOperator('*')} />

        <Button label="7" onClick={() => handleDigit('7')} />
        <Button label="8" onClick={() => handleDigit('8')} />
        <Button label="9" onClick={() => handleDigit('9')} />
        <Button label="−" tone="operator" onClick={() => handleOperator('-')} />

        <Button label="4" onClick={() => handleDigit('4')} />
        <Button label="5" onClick={() => handleDigit('5')} />
        <Button label="6" onClick={() => handleDigit('6')} />
        <Button label="+" tone="operator" onClick={() => handleOperator('+')} />

        <Button label="1" onClick={() => handleDigit('1')} />
        <Button label="2" onClick={() => handleDigit('2')} />
        <Button label="3" onClick={() => handleDigit('3')} />
        <Button label="=" tone="equals" onClick={handleEquals} className="calculator-key--equals" />

        <Button label="0" onClick={() => handleDigit('0')} className="calculator-key--zero" />
        <Button label="." onClick={handleDecimal} />
      </div>
    </section>
  );
}

export default Calculator;
