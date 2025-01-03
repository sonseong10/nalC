import { inputBox, header, flexRow, searchBtn } from "../../styles/app.css";

function Header() {
  return (
    <header className={header}>
      <div>
        <button>메뉴</button>
      </div>

      <div className={flexRow}>
        <input
          className={inputBox}
          placeholder="지역검색 (ㅇㅇ시, ㅇㅇ구, ㅇㅇ동)"
        />

        <button className={searchBtn}>검색</button>
      </div>
    </header>
  );
}

export default Header;
