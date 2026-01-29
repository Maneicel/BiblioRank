import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "../style/BookSub.css";

function normalizeAuthor(authorRaw) {
    if (!authorRaw) return "알 수 없음"; // 데이터가 없을 때 기본값

    //불필요한 텍스트 제거
    let cleanAuthor = authorRaw
        .replace(/지은이: | 지음|(지은이)|글: |글·그림: |글·그림/gi, "") 
        .replace(/,\s*$/, "")
        .replace(/;/g, ", ")
        .trim(); // 양쪽 공백 제거

    return cleanAuthor || "알 수 없음"; // 변환 후에도 비어있으면 기본값 반환
}

export default function BookSub() {
    const location = useLocation(); // 전달된 state를 가져옴
    const book = location.state?.book; // `state` 안의 book 데이터

    if (!book) {
        return <p>책 정보를 찾을 수 없습니다.</p>;
    }


    return (
        <>
            <div id="BookSubHeader">

                <div className="BookSubPreBTN">
                    <Link to="/">
                        <img src="/img/arrowL.webp" alt="previous" />
                        {/* <p id="BookSubPreTxt">뒤로가기</p> */}
                    </Link>
                </div>
            </div>

            <div id="BookSubC">
                <div id="BookNote">
                    <div id="BookNoteL">
                        <img src={book.BOOK_IMAGE_URL} alt="책 이미지" />
                    </div>

                    <div id="BookNoteR">
                        <p id="BookNoteR1">이 책의 이름은 '{book.BOOK_NM_INFO}',</p>
                        <p id="BookNoteR2">대출 순위는 {book.RKI_NO}위,</p>
                        <p id="BookNoteR3">이 책의 저자는 {normalizeAuthor(book.AUTHOR_NM_INFO)},</p>
                        <p id="BookNoteR4">출판사는 {book.PUBLSHCMPY_NM},</p>
                        <p id="BookNoteR5">출판 연도는 {book.PUBLCATN_YY}년.</p>
                    </div>

                </div>
            </div>
        </>
    )
}