import React, { useState } from 'react';
import './Login.css';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  // 이메일 입력값을 처리하는 함수
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  
  function sendAuthCode() {
    fetch("http://localhost:8080/request-sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({memberEmail: email })
    })
    .then(response => {
        if (response.ok) {
            alert("인증번호가 전송되었습니다.");
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .catch(error => alert(error.message));
  }

  // 인증 버튼 클릭 처리 함수
  const handleVerificationClick = () => {
    if (email) {
      // 인증번호 발송 처리 로직 
      sendAuthCode();
      alert('인증번호가 발송되었습니다.');
      setVerificationSent(true);  // 인증번호 발송 후 상태 업데이트
    } else {
      alert('이메일을 입력해 주세요.');
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <form action="http://localhost:8080/user" method="POST">
          <label htmlFor="name">이름</label>
          <input name="memberName" type="text" id="name" className="input-field" placeholder="이름 입력" />

          <label name="nickname" htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" className="input-field" placeholder="닉네임 입력" />

          <label htmlFor="email">이메일</label>
          <div className="email-container">
            <input
              name="memberEmail" 
              type="email"
              id="email"
              className="input-field email-input"
              placeholder="이메일 입력"
              value={email}
              onChange={handleEmailChange}
            />
            <span className="email-suffix">@g.skku.edu</span>
            <button
              className="verification-btn"
              onClick={handleVerificationClick}
              disabled={verificationSent} // 인증번호가 발송되었으면 버튼 비활성화
            >
              인증하기
            </button>
          </div>

          <label htmlFor="verification">인증번호</label>
          <input
            name="authCode"
            type="text"
            id="verification"
            className="input-field"
            placeholder="인증번호 입력"
          />

          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            type="password"
            id="password"
            className="input-field"
            placeholder="비밀번호 입력"
          />
          <button className="create-account-btn" type="submit">계정 생성하기</button>
        </form>
      </div>
    </div>
  );
}