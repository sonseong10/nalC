import moment from "moment";
import { KakaoApi } from "../../../../utils/HTTP";
import { useEffect, useState } from "react";
import {
  regionGroup,
  bookmarkButton,
  todayInfo,
  regionTextGroup,
} from "./region.css";
import Shimmer from "../../../layout/shimmer/Shimmer";
import { flexRow } from "../../../styles/app.css";

interface RegionProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}

interface IResKakaoGeoMap {
  documents: {
    region_type: "B" | "H";
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_4depth_name: string;
    code: string;
    x: number;
    y: number;
  }[];
}

const regionSearch = async (status?: {
  latitude: number;
  longitude: number;
}) => {
  if (!status) {
    return;
  }

  const res = await KakaoApi.get<IResKakaoGeoMap>(
    `/v2/local/geo/coord2regioncode.json`,
    {
      params: {
        x: status?.longitude,
        y: status?.latitude,
      },
    }
  )
    .then((res) => {
      const index = res?.data?.documents.findIndex(
        (adress) => adress.region_type === "H"
      );
      if (index > -1) {
        return res?.data?.documents[index];
      }
    })
    .catch((error) => {
      console.log(error);
      return {};
    });

  return res;
};

function LocalPostion({ status }: RegionProps) {
  const [region, setRegion] = useState<{ [key: string]: string }>({});

  function createAddress() {
    const addressParts = [];

    for (let i = 1; i <= 4; i++) {
      const regionKey = `region_${i}depth_name`;
      if (region[regionKey]) {
        addressParts.push(region[regionKey]);
      }
    }

    return addressParts.join(" ");
  }

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

  return (
    <div className={regionGroup}>
      <strong className={todayInfo}>{moment().format("YYYY.MM.DD")}</strong>

      <div className={`${flexRow} ${regionTextGroup}`}>
        {createAddress().length > 0 ? (
          <>
            <h2>{createAddress()}</h2>

            <div>
              <button className={bookmarkButton} aria-label="미구독"></button>
            </div>
          </>
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
}

export default LocalPostion;
