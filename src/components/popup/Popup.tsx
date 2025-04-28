import { popup, popupHeader, popupTitle } from "./popup.css";

interface IPopupProps {
  isShow: boolean;
  change: (state?: boolean) => void;
}

function Popup({ isShow, change }: IPopupProps) {
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
                change(false);
              }}
            >
              <span>닫기</span>
            </button>
          </header>
          <div>
            <div>
              <input placeholder="행정동 입력" type="text" />
            </div>

            <div>
              <p>총 1건이 검색되었습니다.</p>
              <ol>
                <li>
                  <div>
                    <div>
                      <button>추가</button>
                      <strong>인천광역시 xxx구 xxx동</strong>
                    </div>
                    <div>
                      <button>삭제</button>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <p>관심목록</p>
              <ol>
                <li>
                  <div>
                    <div>
                      <button>추가</button>
                      <strong>인천광역시 xxx구 xxx동</strong>
                    </div>
                    <div>
                      <button>삭제</button>
                    </div>
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
