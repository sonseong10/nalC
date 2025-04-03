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
    const areaNames = Object.values(region)
      .filter((area) => area.name.trim() !== "" && area.name !== "kr")
      .map((area) => area.name);
    return `${areaNames.join(" ")}`;
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
    <div>
      <strong>{moment().format("YYYY.MM.DD")}</strong>

      <div>
        <h2>{createSentence()}</h2>

        <div>
          <button>구독</button>
        </div>
      </div>
    </div>
  );
}

export default LocalPostion;
