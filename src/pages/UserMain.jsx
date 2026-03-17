import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Header from "./Header";
import LoginCard from "./login/LoginCard";
import "../styles/UserMain.css";

export default function UserMain() {
    const [user, setUser] = useState(undefined);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // 로그인 되면 관심 도서 불러오기
    useEffect(() => {
        if (!user) return;

        const loadFavorites = async () => {
            setLoading(true);
            const snapshot = await getDocs(collection(db, "users", user.uid, "favorites"));
            const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            // addedAt 기준 최신순 정렬
            books.sort((a, b) => b.addedAt?.toMillis?.() - a.addedAt?.toMillis?.());
            setFavorites(books);
            setLoading(false);
        };

        loadFavorites();
    }, [user]);

    // 관심 도서 삭제
    const removeFavorite = async (bookId) => {
        await deleteDoc(doc(db, "users", user.uid, "favorites", bookId));
        setFavorites((prev) => prev.filter((b) => b.id !== bookId));
    };

    if (user === undefined) return null;

    return (
        <>
            <Header />

            <div id="InLogin">
                {user ? (
                    <div id="MyPage">
                        <div id="MyPageHeader">
                            <p id="MyPageEmail">{user.email}</p>
                            <h2 id="MyPageTitle">관심 도서</h2>
                        </div>

                        {loading ? (
                            <p className="MyPageEmpty">불러오는 중...</p>
                        ) : favorites.length === 0 ? (
                            <p className="MyPageEmpty">저장한 관심 도서가 없습니다.</p>
                        ) : (
                            <div id="FavGrid">
                                {favorites.map((book, index) => (
                                    <div
                                        className="FavCard"
                                        key={book.id}
                                        style={{ animationDelay: `${index * 0.07}s` }}
                                    >
                                        <img src={book.imageUrl} alt={book.title} />
                                        <button
                                            className="fav-remove-btn"
                                            onClick={() => removeFavorite(book.id)}
                                        >
                                            ★
                                        </button>
                                        <div className="FavInfo">
                                            <p className="FavTitle">{book.title}</p>
                                            <p className="FavAuthor">{book.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <LoginCard />
                )}
            </div>
        </>
    );
}