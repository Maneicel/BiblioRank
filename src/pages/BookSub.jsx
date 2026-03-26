import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "../styles/BookSub.css";

function normalizeAuthor(authorRaw) {
    if (!authorRaw) return "알 수 없음"; // 데이터가 없을 때 기본값

    //불필요한 텍스트 제거
    let cleanAuthor = authorRaw
        .replace(/지은이: | 지음|(지은이)|글: |글·그림: |글·그림|저자 :/gi, "") 
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
                    </Link>
                </div>
            </div>

            <div id="BookSubC">
                <div id="BookNote">
                    <div id="BookNoteL">
                        <img src={book.BOOK_IMAGE_URL} alt="책 이미지" />
                    </div>

                    <div id="BookNoteR">
                        <p id="BookNoteR1">이 책의 이름은 '{book.BOOK_NM_INFO}'.</p>
                        <p id="BookNoteR5">{book.PUBLCATN_YY}년에 출판 된 책이다.</p>
                        
                        <p id="BookNoteR3"><br/>{normalizeAuthor(book.AUTHOR_NM_INFO)}이(가) 작성한 이 책은</p>
                        <p id="BookNoteR4">{book.PUBLSHCMPY_NM}에서 출판되었다.</p>

                        <p id="BookNoteR2"><br/>[{book.RKI_NO}]번째로 많이 대출되고 있는 책이다.</p>
                    </div>

                </div>
            </div>
        </>
    )
}