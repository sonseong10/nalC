import moment from "moment";
import { NaverApi } from "../../utils/HTTP";
import { useEffect, useState } from "react";

interface RegionProps {
  status?: {
    latitude: number;
    longitude: number;
  };
}

const regionSearch = async (status?: {
  latitude: number;
  longitude: number;
}) => {
  if (!status) {
    return;
  }

  const res = await NaverApi.get(`/map-reversegeocode`, {
    params: {
      coords: `${status?.longitude},${status?.latitude}`,
      orders: "admcode",
      output: "json",
    },
  })
    .then((json) => json.data.results[0].region)
    .catch((error) => {
      console.log(error);
      return {};
    });

  return res;
};

function LocalPostion({ status }: RegionProps) {
  const [region, setRegion] = useState<object>({});

  function createSentence(): string {
    // region 객체의 모든 area를 순회하며 name을 추출
    const areaNames = Object.values(region) // region의 모든 값(Area 객체들)을 가져옴
      .filter((area) => area.name.trim() !== "" && area.name !== "kr")
      .map((area) => area.name); // name만 추출

    // area 이름들을 조합하여 문장 만들기
    return `${areaNames.join(" > ")}`;
  }

  useEffect(() => {
    console.log(status);

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
    <div>
      <h2>
        {moment().format("YYYY.MM.DD")}
        <br />
        {createSentence()}
      </h2>

      <div>
        <button>구독</button>
      </div>
    </div>
  );
}

export default LocalPostion;
