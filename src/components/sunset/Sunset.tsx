import Title from "../layout/Title";
import {
  box,
  sunInfo,
  iconArea,
  timeTable,
  timeValue,
  sunChart,
  progressBar,
  currentBar,
  bar,
} from "./sunset.css";

function SunsetInfo() {
  return (
    <div className={box}>
      <div className={sunChart}>
        <div className={progressBar}>
          <div className={currentBar}>
            <div className={bar}></div>
          </div>
        </div>
      </div>

      <div className={sunInfo}>
        <div className={iconArea}></div>

        <dl className={timeTable}>
          <dt>일출</dt>
          <dd className={timeValue}>
            <time dateTime="HH:mm">05:50</time>
          </dd>
          <dt>일몰</dt>
          <dd className={timeValue}>
            <time dateTime="HH:mm">19:20</time>
          </dd>
        </dl>
      </div>
    </div>
  );
}

export default function Sunset() {
  return (
    <>
      <Title text="일출일몰" />

      <SunsetInfo />

      <p className="offer_area">
        <a href="https://www.kasi.re.kr/" target="_blank">
          한국천문연구원
        </a>
        발표
      </p>
    </>
  );
}
