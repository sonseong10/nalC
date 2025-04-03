import { header, flexRow } from "../../styles/app.css";
import {
  searchButton,
  hambugerMenu,
  inputBox,
  searchBar,
} from "./header.css.ts";

function Header() {
  return (
    <header className={header}>
      <div>
        <button className={hambugerMenu} aria-label="메뉴"></button>
      </div>

      <div className={`${flexRow} ${searchBar}`}>
        <input
          className={inputBox}
          placeholder="지역검색 (ㅇㅇ시, ㅇㅇ구, ㅇㅇ동)"
        />

        <button className={searchButton} aria-label="검색"></button>
      </div>
    </header>
  );
}

export default Header;
