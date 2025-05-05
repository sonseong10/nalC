import { MouseEvent } from "react";
import { blind } from "./blind.css";

interface IBlindProps {
  isShow: boolean;
  change: (state?: boolean) => void;
}

function Blind({ isShow, change }: IBlindProps) {
  const onClickLayer = (e: MouseEvent) => {
    e.preventDefault();
    change();
  };

  return (
    <>{isShow ? <div className={blind} onClick={onClickLayer}></div> : null}</>
  );
}

export default Blind;
