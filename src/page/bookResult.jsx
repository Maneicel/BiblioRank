import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Header from "./Header";
import "../style/index.css";

export default function BookResult() {
    const [book, setBook] = useState([]); // 책 데이터
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const booksPerPage = 10; // 페이지당 책 개수

    useEffect(() => {
        axios
            .get("https://openapi.gg.go.kr/Poplitloanbook?KEY=fb93f67c066c4f1aae3a8cf7080726bd&Type=json&pSize=50")
            .then((res) => {
                const bookData = res.data.Poplitloanbook[1].row; // row 배열 가져오기
                saveBooksToFirestore(bookData); // Firestore에 각 책 데이터 저장
                setBook(bookData); // 로컬 상태에 저장
            })
            .catch((e) => console.error(e));
    }, []);

    const saveBooksToFirestore = async (books) => {
        try {
            for (const book of books) {
                const bookData = {
                    title: book.BOOK_NM_INFO || "제목 없음",
                    author: book.AUTHOR_NM_INFO ? book.AUTHOR_NM_INFO.replace("지은이: ", "") : "저자 미상",
                    imageUrl: book.BOOK_IMAGE_URL || "",
                    publicationYear: book.PUBLCATN_YY || "미상",
                    publisher: book.PUBLSHCMPY_NM || "미상",
                    rank: book.RKI_NO || 0,
                    standardDate: book.STD_YM || "미상",
                };

                const bookRef = doc(db, "books", String(book.RKI_NO)); // RKI_NO를 문서 ID로 사용
                const existingDoc = await getDoc(bookRef); // 이미 존재하는지 확인

                if (!existingDoc.exists()) {
                    await setDoc(bookRef, bookData); // 새로운 데이터만 저장
                    console.log(`책 "${bookData.title}" 저장 완료.`);
                } else {
                    console.log(`책 "${bookData.title}"는 이미 저장되어 있습니다.`);
                }
            }
        } catch (e) {
            console.error("데이터 저장 중 에러 발생: ", e);
        }
    };

    // 검색어로 필터링
    const filteredBooks = book.filter((item) => item.BOOK_NM_INFO.toLowerCase().includes(searchQuery.toLowerCase()));

    // 현재 페이지의 책 가져오기
    const currentBooks = filteredBooks.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(0); // 검색어가 변경되면 페이지를 초기화
    };

    return (
        <>
            <Header onSearch={handleSearch} />

            <div id="IndexC">
                <div className={`edgeC ${currentPage === 0 ? "hidden" : ""}`} onClick={goToPreviousPage}>
                    <img src="/img/arrowL.webp" alt="previous" />
                </div>

                <div className="midC">
                    <div className="indexBookC">
                        {currentBooks.length === 0 ? (<p className="ZeroResult">검색어에 맞는 결과를 찾을 수 없습니다.</p>) : (
                            currentBooks.map((item, index) => (
                                <Link to="book_sub" state={{ book: item }}>
                                    <div key={index} className="BookC">
                                        <img src={item.BOOK_IMAGE_URL} alt="책 이미지" />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                    <div className="pageInfo"> <p>{currentPage + 1} / {totalPages}</p> </div>
                </div>

                <div className={`edgeC ${currentPage === totalPages - 1 ? "hidden" : ""}`} onClick={goToNextPage}>
                    <img src="/img/arrowL.webp" alt="next" style={{ transform: "scaleX(-1)" }} />
                </div>
            </div>
        </>
    )
}