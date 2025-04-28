import { blind } from "./blind.css";

interface IBlindProps {
  isShow: boolean;
  change: (state?: boolean) => void;
}

function Blind({ isShow, change }: IBlindProps) {
  return (
    <>
      {isShow ? (
        <div
          className={blind}
          onClick={(e) => {
            e.preventDefault();
            change();
          }}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Blind;
