import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./reviewWrite.css";
import UpperNav from "../../component/upperNav/UpperNav";
import Footer from "../../component/footer/Footer";

export default function ReviewWrite() {
  const { restaurantId } = useParams(); // URL 파라미터에서 restaurantId 가져오기
  const [reviewText, setReviewText] = useState("");
  const maxLength = 2000;

  const restaurants = [
    {
      id: 1,
      name: "청년다방 성균관대점",
    },
    {
      id: 2,
      name: "홍콩반점 0410 강남점",
    },
  ];

  const restaurant = restaurants.find((r) => r.id === parseInt(restaurantId));

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = () => {
    alert(`"${restaurant.name}"의 리뷰가 작성되었습니다!`);
  };

  return (
    <div className="container review-write-page">
      <UpperNav title="리뷰" />
      <div className="content">
        <h3>{restaurant.name}</h3>
        <div className="stars">
          {Array(5)
            .fill()
            .map((_, i) => (
              <img
                key={i}
                src={i < 3 ? "/image/filled_star.svg" : "/image/empty_star.svg"}
                alt="star"
                style={{ width: "24px", height: "24px" }}
              />
            ))}
        </div>
        <h4>후기를 작성해 보세요!</h4>
        <textarea
          className="review-textarea"
          placeholder="맛있었던 메뉴에 대한 추천이나 마음에 들었던 부분에 대해 리뷰해주세요! 너무 심한 나쁜 말은 안돼요 :)"
          maxLength={maxLength}
          value={reviewText}
          onChange={handleTextChange}
        />
        <div className="text-counter">
          {reviewText.length}/{maxLength}
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          작성 완료
        </button>
      </div>
      <Footer />
    </div>
  );
}
