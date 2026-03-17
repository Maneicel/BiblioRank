import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "../../styles/SignUpCard.css";
import Header from "../Header";

export default function SignupCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
 
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
 
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/user_main"); 
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("이미 사용 중인 이메일입니다.");
      } else if (err.code === "auth/invalid-email") {
        setError("올바른 이메일 형식이 아닙니다.");
      } else {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
    <Header/>
    <div className="nb-root">
      <div className="nb-card">
 
        {/* 헤더 */}
        <div className="nb-header">
          <p className="nb-label">sign up</p>
          <h1 className="nb-title">회원가입</h1>
          <div className="nb-holes">
            <div className="nb-hole" />
            <div className="nb-hole" />
            <div className="nb-hole" />
          </div>
        </div>
 
        {/* 본문 */}
        <div className="nb-body">
          <form onSubmit={handleSignup}>
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
                placeholder="6자 이상"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
 
            <div className="nb-form-group">
              <label className="nb-form-label" htmlFor="nb-pw-confirm">비밀번호 확인</label>
              <input
                className="nb-form-input"
                id="nb-pw-confirm"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
 
            {error && <p className="nb-error">{error}</p>}
 
            <button className="nb-btn-login" type="submit" disabled={loading}>
              {loading ? "가입 중..." : "CREATE ACCOUNT"}
            </button>
          </form>
 
          <p className="nb-signup">
            이미 계정이 있으신가요?{" "}
            <a href="/login">로그인</a>
          </p>
        </div>
 
        {/* 하단 */}
        <div className="nb-footer">
          <span className="nb-page">회원가입</span>
          <span className="nb-page">p. 02</span>
        </div>
 
      </div>
    </div>
    </>
    
  );
}