import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  regionGroup,
  bookmarkButton,
  todayInfo,
  regionTextGroup,
} from "./region.css";
import Shimmer from "../../../layout/shimmer/Shimmer";
import { flexRow } from "../../../../styles/app.css";
import { regionSearch } from "../../../../utils/regionSearch";

interface RegionProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}

interface IBookmarkData {
  name: string;
  latitude: number;
  longitude: number;
}

const createAddress = (region: { [key: string]: string | number }) => {
  const addressParts = [];

  for (let i = 1; i <= 4; i++) {
    const regionKey = `region_${i}depth_name`;
    if (region[regionKey]) {
      addressParts.push(region[regionKey]);
    }
  }

  return addressParts.join(" ");
};

function LocalPostion({ status }: RegionProps) {
  const [region, setRegion] = useState<{ [key: string]: string | number }>({});
  const [isBookmark, setBookomark] = useState(false);

  useEffect(() => {
    if (status) {
      const fetchData = async () => {
        const data = await regionSearch(status);
        if (data) {
          setRegion(data);
        }
      };
      fetchData();
    }
  }, [status]);

  const toggleBookmark = useCallback(() => {
    const localData = localStorage.getItem("bookmarkList");
    const currentName = createAddress(region);

    if (localData !== null) {
      const list: Array<IBookmarkData> = JSON.parse(localData);

      if (!isBookmark) {
        const updatedList = [{ name: currentName, ...status }, ...list];
        const slicedList = updatedList.slice(0, 7);
        localStorage.setItem("bookmarkList", JSON.stringify(slicedList));
      } else {
        const newList = list.filter((item) => item.name !== currentName);
        localStorage.setItem("bookmarkList", JSON.stringify(newList));
      }
    } else {
      localStorage.setItem(
        "bookmarkList",
        JSON.stringify([{ name: currentName, ...status }])
      );
    }

    setBookomark(!isBookmark);
  }, [region, status, isBookmark]);

  useEffect(() => {
    const localData = localStorage.getItem("bookmarkList");
    if (localData !== null) {
      const list: Array<IBookmarkData> = JSON.parse(localData);
      if (list.findIndex((item) => item.name === createAddress(region)) > -1) {
        setBookomark(true);
      } else {
        setBookomark(false);
      }
    }
  }, [region]);

  return (
    <>
      <strong className={todayInfo}>{moment().format("YYYY.MM.DD")}</strong>

      <div className={regionGroup}>
        <div className={`${flexRow} ${regionTextGroup}`}>
          {createAddress(region).length > 0 ? (
            <>
              <h2>{createAddress(region)}</h2>

              <div>
                <button
                  className={`${bookmarkButton} ${isBookmark && "isActive"}`}
                  aria-label={isBookmark ? "구독" : "미구독"}
                  onClick={toggleBookmark}
                ></button>
              </div>
            </>
          ) : (
            <Shimmer />
          )}
        </div>
      </div>
    </>
  );
}

export default LocalPostion;
