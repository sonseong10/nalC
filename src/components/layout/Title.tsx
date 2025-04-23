interface ITitleProps {
  text: string;
}

function Title({ text }: ITitleProps) {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
}

export default Title;
