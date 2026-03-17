import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import Header from "./Header";
import { BOOK_API_URL } from "../api";

import "../styles/index.css";
import "../styles/basic.css";

export default function BookResult() {
    const [book, setBook] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState(new Set());
    const booksPerPage = 10;

    // API에서 직접 책 데이터 불러오기
    useEffect(() => {
        axios
            .get(BOOK_API_URL)
            .then((res) => {
                setBook(res.data.Poplitloanbook[1].row);
            })
            .catch((e) => console.error(e));
    }, []);

    // 관심 도서 불러오기 — 로그인 확인 후 불러오기
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) return;

            const snapshot = await getDocs(collection(db, "users", currentUser.uid, "favorites"));
            const ids = new Set(snapshot.docs.map((doc) => doc.id));
            setFavorites(ids);
        });
        return () => unsubscribe();
    }, []);

    // 별 버튼 토글
    const toggleFavorite = async (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const bookId = String(item.RKI_NO);
        const favRef = doc(db, "users", uid, "favorites", bookId);

        if (favorites.has(bookId)) {
            await deleteDoc(favRef);
            setFavorites((prev) => {
                const next = new Set(prev);
                next.delete(bookId);
                return next;
            });
        } else {
            await setDoc(favRef, {
                title: item.BOOK_NM_INFO || "제목 없음",
                author: item.AUTHOR_NM_INFO ? item.AUTHOR_NM_INFO.replace("지은이: ", "") : "저자 미상",
                imageUrl: item.BOOK_IMAGE_URL || "",
                rank: item.RKI_NO || 0,
                addedAt: new Date(),
            });
            setFavorites((prev) => new Set(prev).add(bookId));
        }
    };

    const filteredBooks = book.filter((item) =>
        item.BOOK_NM_INFO.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentBooks = filteredBooks.slice(
        currentPage * booksPerPage,
        (currentPage + 1) * booksPerPage
    );

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(0);
    };

    return (
        <>
            <Header onSearch={handleSearch} />

            <div id="IndexC" className="nb-root">
                <div className={`edgeC ${currentPage === 0 ? "hidden" : ""}`} onClick={goToPreviousPage}>
                    <img src="/img/arrowL.webp" alt="previous" />
                </div>

                <div className="midC">
                    <div className="indexBookC">
                        {currentBooks.length === 0 ? (
                            <p className="ZeroResult">검색어에 맞는 결과를 찾을 수 없습니다.</p>
                        ) : (
                            currentBooks.map((item, index) => (
                                <Link to="book_sub" state={{ book: item }} key={index}>
                                    <div
                                        className="BookC"
                                        style={{ animationDelay: `${index * 0.07}s` }}
                                    >
                                        <img src={item.BOOK_IMAGE_URL} alt="책 이미지" />

                                        <button
                                            className={`fav-btn ${favorites.has(String(item.RKI_NO)) ? "active" : ""}`}
                                            onClick={(e) => toggleFavorite(e, item)}
                                        >
                                            {favorites.has(String(item.RKI_NO)) ? "★" : "☆"}
                                        </button>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                    <div className="pageInfo">
                        <p>{currentPage + 1} / {totalPages}</p>
                    </div>
                </div>

                <div className={`edgeC ${currentPage === totalPages - 1 ? "hidden" : ""}`} onClick={goToNextPage}>
                    <img src="/img/arrowL.webp" alt="next" style={{ transform: "scaleX(-1)" }} />
                </div>
            </div>
        </>
    );
}