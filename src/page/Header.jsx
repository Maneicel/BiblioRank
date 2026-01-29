import "../style/Header.css";

export default function Header({ onSearch }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(e.target.value); // 엔터를 눌렀을 때 검색어를 전달
        }
    };

    return (
        <div id="HC">
            <div id="SearchC">
                <input
                    type="text"
                    placeholder="책 제목 검색"
                    onKeyPress={handleKeyPress} // 엔터키로 검색
                />
                <img src="/img/search.svg" alt="search icon" />
            </div>
        </div>
    );
}
