import { KakaoApi } from "./HTTP";

export interface IResKakaoGeoMap {
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

export const regionSearch = async (status?: {
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
      return undefined;
    });

  return res;
};
