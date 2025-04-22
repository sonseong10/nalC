import { header, logo, searchButton } from "./header.css.ts";

function Header() {
  return (
    <header className={header}>
      <h1 className={logo} draggable={false}>
        nalC
      </h1>

      <button className={searchButton}>지역설정</button>
    </header>
  );
}

export default Header;
