interface ITitleProps {
  text: string;
  className?: string;
}

function Title({ text, className }: ITitleProps) {
  return (
    <div className={className}>
      <h2>{text}</h2>
    </div>
  );
}

export default Title;
