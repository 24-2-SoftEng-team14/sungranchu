import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Search.css";
import arrowIcon from "./arrow.png";
import Footer from "../../component/footer/Footer";

export default function Search() {
  const [searchCategories, setSearchCategories] = useState([]); // JSON 데이터를 저장
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // 팝업에 표시할 선택된 식당
  const [searchQuery, setSearchQuery] = useState(""); // 검색창 입력값
  const [error, setError] = useState(null); // 에러 상태
  const categoryRef = useRef(null);

  // JSON 데이터 로드
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/restaurants.json");
        if (!response.ok) throw new Error("Failed to fetch JSON data");
        const data = await response.json();

        // 이미지 경로 처리
        const updatedData = data.map((category) => ({
          ...category,
          items: category.items.map((item) => ({
            ...item,
            img: item.img.replace("public/", "/"), // 이미지 경로 수정
          })),
        }));

        setSearchCategories(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === "") {
        // 빈칸 입력: 전체 데이터 로드
        const jsonResponse = await fetch("/restaurants.json");
        if (!jsonResponse.ok) throw new Error("Failed to load JSON file");
        const allData = await jsonResponse.json();
        setSearchCategories(allData);
        setError(null);
        return;
      }

      // 검색 API 호출
      const response = await axios.get(`/searchRestaurant/${searchQuery}`);
      const restaurantNames = response.data.map(
        (restaurant) => restaurant.name
      );

      // JSON 파일에서 이름으로 데이터 검색
      const jsonResponse = await fetch("/restaurants.json");
      if (!jsonResponse.ok) throw new Error("Failed to load JSON file");
      const restaurantData = await jsonResponse.json();

      // 이름으로 필터링
      const matchedCategories = restaurantData
        .map((category) => ({
          ...category,
          items: category.items.filter((item) =>
            restaurantNames.includes(item.name)
          ),
        }))
        .filter((category) => category.items.length > 0);

      setSearchCategories(matchedCategories); // 검색 결과 업데이트
      setError(null); // 에러 초기화
    } catch (err) {
      console.error("Error during search:", err);
      setError("검색에 실패했습니다.");
      setSearchCategories([]); // 검색 결과 초기화
    }
  };

  const scroll = (direction) => {
    if (categoryRef.current) {
      const { scrollLeft, clientWidth } = categoryRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      categoryRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const openPopup = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const closePopup = () => {
    setSelectedRestaurant(null);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars > 0;

    return (
      <div className="popup-stars">
        {Array(filledStars)
          .fill()
          .map((_, index) => (
            <img
              key={`filled-${index}`}
              src="/image/filled_star.svg"
              alt="Filled Star"
              className="star-icon"
            />
          ))}
        {halfStar && (
          <img
            src="/image/half_star.svg"
            alt="Half Star"
            className="star-icon half-star"
          />
        )}
        {Array(totalStars - filledStars - (halfStar ? 1 : 0))
          .fill()
          .map((_, index) => (
            <img
              key={`empty-${index}`}
              src="/image/empty_star.svg"
              alt="Empty Star"
              className="star-icon"
            />
          ))}
      </div>
    );
  };

  return (
    <div className="search-container">
      <header className="search-header">
        <h2 className="search-title">검색 페이지</h2>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="레스토랑 이름을 입력하세요."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-icon" onClick={handleSearch}>
          🔍
        </button>
      </div>

      <div className="search-results">
        {error && <p className="error">{error}</p>}
        {searchCategories.length === 0 ? (
          <div
            style={{
              display: "flex", // Flexbox 활성화
              justifyContent: "center", // 수평 가운데 정렬
              alignItems: "center", // 수직 가운데 정렬
              height: "100vh", // (선택) 화면 전체 높이 가운데 정렬
            }}
          >
            Loading...
          </div>
        ) : (
          searchCategories.map((category, index) => (
            <div key={index} className="search-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="category-items-container">
                <div className="category-items" ref={categoryRef}>
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="category-item"
                      onClick={() => openPopup(item)}
                    >
                      <img src={item.img} alt={item.name} />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="scroll-arrow right"
                  onClick={() => scroll("right")}
                >
                  <img src={arrowIcon} alt="Scroll Right" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 팝업 */}
      {selectedRestaurant && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-scrollable-content">
              <img
                src={selectedRestaurant.img}
                alt={selectedRestaurant.name}
                className="popup-image"
              />
              <h3 className="popup-title">{selectedRestaurant.name}</h3>
              <p className="popup-address">{selectedRestaurant.address}</p>
              {selectedRestaurant.reviews && (
                <div className="popup-reviews">
                  <h4>리뷰</h4>
                  {selectedRestaurant.reviews.map((review, index) => (
                    <div key={index} className="popup-review">
                      <p>{review.text}</p>
                      <div className="popup-stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="kingo-popup-buttons">
              <button
                className="popup-button"
                onClick={() => window.open("https://maps.google.com", "_blank")}
              >
                지도에서 보기
              </button>
              <button className="popup-button" onClick={closePopup}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
