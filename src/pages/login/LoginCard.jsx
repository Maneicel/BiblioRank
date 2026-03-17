import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import "../../styles/LoginCard.css";
import { Link } from "react-router-dom";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      setError("Google 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="nb-root">
      <div className="nb-card">

        <div className="nb-header">
          <p className="nb-label">sign in</p>
          <h1 className="nb-title">로그인</h1>
          <div className="nb-holes">
            <div className="nb-hole" />
            <div className="nb-hole" />
            <div className="nb-hole" />
          </div>
        </div>

        <div className="nb-body">
          <form onSubmit={handleLogin}>
            <div className="nb-form-group">
              <label className="nb-form-label" htmlFor="nb-email">이메일</label>
              <input
                className="nb-form-input"
                id="nb-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="nb-form-group">
              <label className="nb-form-label" htmlFor="nb-pw">비밀번호</label>
              <input
                className="nb-form-input"
                id="nb-pw"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="nb-error">{error}</p>}

            <button className="nb-btn-login" type="submit" disabled={loading}>
              {loading ? "로그인 중..." : "LOGIN"}
            </button>
          </form>

          <div className="nb-divider">
            <span className="nb-divider-line" />
            <span className="nb-divider-text">or</span>
            <span className="nb-divider-line" />
          </div>

          <button className="nb-btn-google" onClick={handleGoogle} type="button">
            <svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
              <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            GOOGLE로 계속하기
          </button>

          <p className="nb-signup">
            아직 계정이 없으신가요?{" "}
            <Link to="/sign_up"><a href="/signup">회원가입</a></Link>
          </p>
        </div>

        <div className="nb-footer">
          <span className="nb-page">로그인</span>
          <span className="nb-page">p. 01</span>
        </div>

      </div>
    </div>
  );
}
