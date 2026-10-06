function Button({ label, onClick, tone = 'number', className = '', ariaLabel }) {
  return (
    <button
      type="button"
      className={`calculator-key calculator-key--${tone} ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
}

export default Button;
