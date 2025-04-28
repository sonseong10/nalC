import { useRef, useState } from "react";
import {
  addressGroup,
  addressItem,
  addressName,
  closedButton,
  dataNone,
  deleteButton,
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

interface IPopupProps {
  isShow: boolean;
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

function Popup({ isShow, change }: IPopupProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [address, setAddress] = useState<Array<IAddressData> | undefined>(
    undefined
  );
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

  function colorText(inputText: string) {
    if (inputRef.current) {
      const regex = new RegExp(inputRef.current.value, "g");
      const result = inputText.replace(
        regex,
        `<span style="color: #0066ff;">${inputRef.current.value}</span>`
      );

      return { __html: result };
    }
  }

  return (
    <>
      {!isShow ? (
        <></>
      ) : (
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
                placeholder="행정동 입력"
                type="text"
                className={searchInput}
                ref={inputRef}
              />
            </form>

            <div>
              <span className={sessionTitle}>
                {totalCount <= 0
                  ? "검색결과"
                  : `총 ${totalCount.toLocaleString()}건이 검색되었습니다.`}
              </span>
              <ol className={addressGroup}>
                {!address || address.length <= 0 ? (
                  <div className={dataNone}>
                    <span>검색결과가 없습니다.</span>
                    <span>검색어를 확인 해주세요</span>
                  </div>
                ) : (
                  address.map((info, index) => (
                    <li key={index} className={addressItem}>
                      <button className={itemButton}>
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

            <div>
              <span className={sessionTitle}>관심목록(1/7)</span>
              <ol className={addressGroup}>
                <li className={addressItem}>
                  <button className={itemButton}>
                    <span className={placeName}>{""}</span>
                    <strong className={addressName}>
                      {"인천 xxx구 xxx동"}
                    </strong>
                  </button>
                  <div>
                    <button className={deleteButton}>X</button>
                  </div>
                </li>
              </ol>
            </div>

            <footer></footer>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Popup;
