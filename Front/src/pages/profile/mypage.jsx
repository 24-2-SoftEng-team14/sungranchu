import {React, useEffect, useState} from "react";
import "./profile.css";
import Footer from "../../component/footer/Footer";
import ItemButton from "../../component/itemButton/ItemButton";
import UpperNav from "../../component/upperNav/UpperNav";
import { useNavigate } from "react-router-dom";

import restaurantIcon from "./img/restaurant_icon.png";
import reviewIcon from "./img/review_icon.png";
import achievementIcon from "./img/achievement_icon.png";
import baseImage from "./img/basic_profile.png";

export default function MyPage({globalProfileImage, SetGlobalProfileImage}) {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(baseImage); // 로그인하고 이미지를 변경하면 이 이미지가 동적으로 변경되도록 바꿔야 함.
  const [nickname, setNickname] = useState('마라엽떡');

  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log('nick: ', userData.nickname);
    setNickname(userData.nickname);
  }, [userData])

  useEffect(()=> {
    const getProfileImage = async () => {
      const response = await fetch("http://localhost:8080/mypage/profile-image", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
      if (response.ok){
        const blob = await response.blob(); // 응답을 Blob 형식으로 변환
        const imageUrl = URL.createObjectURL(blob); // Blob에서 이미지 URL 생성
        setProfileImage(imageUrl);
      }
    }
    getProfileImage();
  }, [])

  useEffect(() => {
    const get_user = async (e) => {
      try {
        const response = await fetch('http://localhost:8080/mypage/info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });

        if (response.ok) {
          const data = await response.json(); // JSON 데이터 읽기
          setUserData(data);
        } else if (response.status === 401) {
          alert('로그인 실패: 잘못된 자격 증명');
        } else {
          console.error(`로그인 실패: ${response.status}`);
        }
      } catch (error) {
        console.error('네트워크 에러 발생:', error);
      }
    }
    get_user();
  }, [])

  function handleAchievementClick() {
    navigate("/mypage/achievement");
  }

  function handleRestaurantClick() {
    navigate("/mypage/review");
  }

  function handleVisitedClick() {
    navigate("/mypage/visited");
  }

  function handleLogoutClick() {
    navigate("/");
  }

  return (
    <div className="container">
      <div class="page-header">
        <h1 class="page-title">마이페이지</h1>
      </div>
  
      <ProfileCard
        profileImage={globalProfileImage}
        nickname={nickname}
        leftText="Lv: 1"
        rightText="초보 먹방러"
      />

      <ItemButton
        imageSrc={restaurantIcon}
        title="방문 식당 기록 확인"
        subtitle="방문했던 식당을 확인할 수 있어요."
        onClick={handleVisitedClick}
      />
      <ItemButton
        imageSrc={reviewIcon}
        title="리뷰 쓰기"
        subtitle="친구들을 위해 소중한 리뷰를 남겨요."
        onClick={handleRestaurantClick}
      />
      <ItemButton
        imageSrc={achievementIcon}
        title="업적 확인"
        subtitle="미션을 수행해서 나만의 업적을 쌓아가요."
        onClick={handleAchievementClick}
      />
      <button className="log-out" onClick={handleLogoutClick}>
        로그아웃
      </button>
      <Footer />
    </div>
  );
}

function ProfileCard({ profileImage, nickname, leftText, rightText }) {
  const navigate = useNavigate();

  function handleModifyClick() {
    navigate("/mypage/modify");
  }

  return (
    <div className="profile-card">
      <div className="profile-left">
        <img className="profile-image" src={profileImage} alt="Profile" />
        <button className="profile-button" onClick={handleModifyClick}>
          프로필 변경
        </button>
      </div>
      <div className="profile-right">
        <div className="profile-main-text">
          {nickname} 님<span style={{ fontSize: "12px" }}>의 마이페이지</span>
        </div>
        <div className="profile-sub-text">
          <span className="left-text">{leftText}</span>
          <span className="right-text">{rightText}</span>
        </div>
      </div>
    </div>
  );
}



/*      <ItemButton
        imageSrc={reservationIcon}
        title="예약하기"
        subtitle="캐치테이블과 연동하여 식당을 예약해요."
        onClick={() => {
          alert("캐치테이블로 이동합니다.\n(사실 아직 개발중)");
        }}
      />
*/