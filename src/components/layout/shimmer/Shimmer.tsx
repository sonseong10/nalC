import { memo } from "react";
import { shimmer, shimmerWrapper } from "./shimmer.css";

function Shimmer() {
  return (
    <div className={shimmerWrapper}>
      <div className={shimmer}></div>
    </div>
  );
}

export default memo(Shimmer);
