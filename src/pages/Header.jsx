import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Header.css";

export default function Header({ onSearch }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // 드롭다운 바깥 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(e.target.value);
        }
    };

    const handleHome = () => {
        if (onSearch) onSearch("");
        navigate("/");
    };

    const handleUserClick = () => {
        if (!user) {
            navigate("/user_main"); // 비로그인 시 바로 이동
        } else {
            setDropdownOpen((prev) => !prev); // 로그인 시 드롭다운
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setDropdownOpen(false);
        navigate("/");
    };

    return (
        <div id="HC">

            <div id="SearchC">
                <input
                    type="text"
                    placeholder="책 제목 검색"
                    onKeyPress={handleKeyPress}
                />
                <img src="/img/search.svg" alt="search icon" />
            </div>

            <div id="HC_HomeIcon" onClick={handleHome} style={{ cursor: "pointer" }}>
                <img src="/img/home.png" alt="home icon" />
            </div>

            <div id="HC_UserWrap" ref={dropdownRef}>
                <div id="HC_UserIcon" onClick={handleUserClick} style={{ cursor: "pointer" }}>
                    <img src="/img/user.png" alt="user icon" />
                </div>

                {dropdownOpen && (
                    <div id="HC_Dropdown">
                        <div className="HC_DropItem" onClick={() => { setDropdownOpen(false); navigate("/user_main"); }}>
                            마이페이지
                        </div>
                        <div className="HC_DropItem HC_DropLogout" onClick={handleLogout}>
                            로그아웃
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}