import { memo, useEffect, useRef, useState } from "react";
import {
  addressGroup,
  addressItem,
  addressName,
  bookmarkButton,
  bookmarkGroup,
  bookmarkItem,
  closedButton,
  dataNone,
  itemButton,
  placeName,
  popup,
  popupHeader,
  popupTitle,
  searchForm,
  searchInput,
  sessionTitle,
} from "./popup.css";
import { KakaoApi } from "../../utils/HTTP";
import { regionSearch } from "../../utils/regionSearch";

interface IPopupProps {
  updateLocation: (location: { longitude: number; latitude: number }) => void;
  change: (state?: boolean) => void;
}

interface IAddressData {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface IResKakaoKeywordAddress {
  documents: IAddressData[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: { keyword: ""; region: object[]; selected_region: string };
    total_count: number;
  };
}

function Popup({ change, updateLocation }: IPopupProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [address, setAddress] = useState<Array<IAddressData> | undefined>(
    undefined
  );
  const [bookmarkList, setBookmarkList] = useState<
    Array<{ name: string; longitude: number; latitude: number }>
  >([]);

  const [totalCount, setTotalCount] = useState(0);
  const getAddress = async () => {
    if (inputRef.current && inputRef.current.value.trim().length <= 0) {
      return;
    } else {
      await KakaoApi.get<IResKakaoKeywordAddress>("/v2/local/search/keyword", {
        params: {
          query: inputRef.current?.value,
        },
      }).then((res) => {
        setAddress(res?.data?.documents);
        setTotalCount(res?.data?.meta?.total_count);
      });
    }
  };

  const colorText = (inputText: string) => {
    if (inputRef.current) {
      const regex = new RegExp(inputRef.current.value, "g");
      const result = inputText.replace(
        regex,
        `<span style="color: #0066ff;">${inputRef.current.value}</span>`
      );

      return { __html: result };
    }
  };

  const updateRegion = async (info: {
    y: number | string;
    x: number | string;
  }) => {
    await regionSearch({
      latitude: Number(info.y),
      longitude: Number(info.x),
    }).then((res) => {
      if (res) {
        updateLocation({ latitude: res.y, longitude: res.x });
        change(false);
      }
    });
  };

  useEffect(() => {
    const localData = localStorage.getItem("bookmarkList");
    if (localData) {
      const list: Array<{ name: string; longitude: number; latitude: number }> =
        JSON.parse(localData);
      setBookmarkList(list);
    }
  }, []);

  return (
    <dialog className={popup}>
      <header className={popupHeader}>
        <h2 className={popupTitle}>지역검색</h2>

        <button
          onClick={(e) => {
            e.preventDefault();
            setAddress(undefined);
            setTotalCount(0);
            change(false);
          }}
          className={closedButton}
        >
          <span>닫기</span>
        </button>
      </header>
      <div>
        <form
          action={void 0}
          method="get"
          onSubmit={(e) => {
            e.preventDefault();
            getAddress();
          }}
          className={searchForm}
        >
          <input
            id="search"
            placeholder="서울특별시 중구 세종대로 40"
            type="text"
            className={searchInput}
            ref={inputRef}
          />
        </form>

        <div>
          {bookmarkList.length <= 0 ? (
            <></>
          ) : (
            <>
              <span className={sessionTitle}>
                관심목록({bookmarkList.length}/7)
              </span>
              <ol className={bookmarkGroup}>
                {bookmarkList.map((bookmark, index) => (
                  <li className={bookmarkItem} key={index}>
                    <button
                      className={bookmarkButton}
                      onClick={(e) => {
                        e.preventDefault();
                        updateRegion({
                          x: bookmark.longitude,
                          y: bookmark.latitude,
                        });
                      }}
                    >
                      <strong>{bookmark.name}</strong>
                    </button>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>

        <div>
          <span className={sessionTitle}>
            {totalCount <= 0
              ? "검색결과"
              : `총 ${totalCount > 15 ? 15 : totalCount}건이 검색되었습니다.`}
          </span>
          <ol className={addressGroup}>
            {!address || address.length <= 0 ? (
              <div className={dataNone}>
                <p>검색어를 확인 또는 입력 해주세요</p>
              </div>
            ) : (
              address.map((info, index) => (
                <li key={index} className={addressItem}>
                  <button
                    className={itemButton}
                    onClick={(e) => {
                      e.preventDefault();
                      updateRegion({ x: info.x, y: info.y });
                    }}
                  >
                    <span className={placeName}>{info.place_name}</span>
                    <strong
                      className={addressName}
                      dangerouslySetInnerHTML={colorText(info.address_name)}
                    ></strong>
                  </button>
                </li>
              ))
            )}
          </ol>
        </div>

        <footer></footer>
      </div>
    </dialog>
  );
}

export default memo(Popup);
