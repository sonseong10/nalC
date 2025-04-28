import { MouseEvent } from "react";
import { header, logo, searchButton } from "./header.css.ts";

interface IHeaderProps {
  blindChange: (state?: boolean) => void;
}

function Header({ blindChange }: IHeaderProps) {
  const popupOpen = (e: MouseEvent) => {
    e.preventDefault();
    blindChange(true);
  };
  return (
    <header className={header}>
      <h1 className={logo} draggable={false}>
        nalC
      </h1>

      <button
        className={searchButton}
        onClick={(e) => {
          popupOpen(e);
        }}
      >
        지역설정
      </button>
    </header>
  );
}

export default Header;
