import React from 'react';
import './profile.css';
import Footer from '../../component/footer/Footer'
import ItemButton from '../../component/itemButton/ItemButton'

import restaurantIcon from './restaurant_icon.png';
import reviewIcon from './review_icon.png';
import reservationIcon from './reservation_icon.png';
import achievementIcon from './achievement_icon.png';
import baseImage from './basic_profile.png';

export default function MyPage () {
  const profileImage = baseImage; // 로그인하고 이미지를 변경하면 이 이미지가 동적으로 변경되도록 바꿔야 함.
  return (
    <div className="container">
      <UpperNav />
      <ProfileCard profileImage={profileImage} nickname="마라엽떡" leftText="Lv: 1" rightText="초보 먹방러"/>
      <ItemButton imageSrc={restaurantIcon} title="방문 식당 기록 확인" subtitle="방문했던 식당을 확인할 수 있어요."/>
      <ItemButton imageSrc={reviewIcon} title="리뷰 쓰기" subtitle="친구들을 위해 소중한 리뷰를 남겨요."/>
      <ItemButton imageSrc={reservationIcon} title="예약하기" subtitle="캐치테이블과 연동하여 식당을 예약해요."/>
      <ItemButton imageSrc={achievementIcon} title="업적 확인" subtitle="미션을 수행해서 나만의 업적을 쌓아가요."/>
      <button className="log-out">로그 아웃</button>
      <Footer />
    </div>
  )
}

function UpperNav() {
  return (
    <div className="upper-nav">
      <b className="nav-title">마이 페이지</b>
    </div>
    
  );
}

function ProfileCard ({ profileImage, nickname, leftText, rightText }) {
  return (
    <div className="profile-card">
      <div className="profile-left">
        <img className="profile-image" src={profileImage} alt="Profile" />
        <button className="profile-button">프로필 변경</button>
      </div>
      <div className="profile-right">
        <div className="profile-main-text">{nickname}<span style={{fontSize: '14px'}}>님의 마이페이지</span></div>
        <div className="profile-sub-text">
          <span className="left-text">{leftText}</span>
          <span className="right-text">{rightText}</span>
        </div>
      </div>
    </div>
  );
};