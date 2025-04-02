import moment from "moment";

function LocalPostion() {
  return (
    <div>
      <h2>
        {moment().format("YYYY.MM.DD")}
        <br /> oo동 오늘의 날씨
      </h2>
      <button>구독</button>
    </div>
  );
}

export default LocalPostion;
