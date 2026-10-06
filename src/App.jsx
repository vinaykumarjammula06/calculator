import Calculator from './components/Calculator.jsx';

function App() {
  return (
    <main className="page-shell">
      <header className="page-heading">
        <span className="page-heading__mark" aria-hidden="true">+</span>
        <h1>Calculator</h1>
      </header>
      <Calculator />
      <footer className="page-footer">A little math, made simple.</footer>
    </main>
  );
}

export default App;
