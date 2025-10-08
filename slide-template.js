// 確保在 DOM 完全載入後才執行腳本，避免找不到元素
document.addEventListener('DOMContentLoaded', () => {

  // --- 變數初始化 ---
  // 選取所有的投影片元素，回傳一個 NodeList
  const slides = document.querySelectorAll('.slide');
  // 選取導覽按鈕
  const prevButton = document.getElementById('prev-slide');
  const nextButton = document.getElementById('next-slide');
  const themeButton = document.getElementById('toggle-theme');
  // 設定當前投影片的索引，從第一張 (索引 0) 開始
  let currentIndex = 0;
  // 取得投影片總數
  const totalSlides = slides.length;

  /**
   * @function showSlide
   * @description 根據傳入的索引顯示對應的投影片，並隱藏其他所有投影片。
   * @param {number} index - 要顯示的投影片索引。
   */
  function showSlide(index) {
    // 遍歷所有投影片
    slides.forEach((slide, i) => {
      // 如果是目標索引，就顯示它 (設為 block 讓它可見)；否則就隱藏。
      // 投影片本身的 flex 屬性由 CSS 控制。
      slide.style.display = (i === index) ? 'block' : 'none';
    });
    // 更新當前的索引
    currentIndex = index;
    // 每次切換後都更新按鈕狀態
    updateNavState();
  }

  /**
   * @function updateNavState
   * @description 根據當前投影片索引，更新導覽按鈕的禁用狀態。
   */
  function updateNavState() {
    // 如果是第一張，禁用「上一張」按鈕
    prevButton.disabled = (currentIndex === 0);
    // 如果是最後一張，禁用「下一張」按鈕
    nextButton.disabled = (currentIndex === totalSlides - 1);
  }

  /**
   * @function goToNextSlide
   * @description 切換到下一張投影片。
   */
  function goToNextSlide() {
    if (currentIndex < totalSlides - 1) {
      showSlide(currentIndex + 1);
    }
  }

  /**
   * @function goToPrevSlide
   * @description 切換到上一張投影片。
   */
  function goToPrevSlide() {
    if (currentIndex > 0) {
      showSlide(currentIndex - 1);
    }
  }

  /**
   * @function toggleTheme
   * @description 切換白天與黑夜模式。
   */
  function toggleTheme() {
    // 切換 body 的 class
    document.body.classList.toggle('night-mode');
    // 根據當前模式更新按鈕圖示
    if (document.body.classList.contains('night-mode')) {
      themeButton.innerHTML = '☀️';
    } else {
      themeButton.innerHTML = '🌙';
    }
  }

  /**
   * @function navigateSlides
   * @description 處理鍵盤事件，根據按下的按鍵來導覽投影片。
   * @param {KeyboardEvent} event - 鍵盤事件物件。
   */
  function navigateSlides(event) {
    switch (event.key) {
      case 'ArrowRight':
        goToNextSlide();
        break;
      case 'ArrowLeft':
        goToPrevSlide();
        break;
    }
  }

  // --- 程式執行入口 ---
  // 1. 頁面載入時，初始化投影片顯示
  showSlide(currentIndex);

  // 2. 監聽鍵盤事件
  document.addEventListener('keydown', navigateSlides);

  // 3. 監聽按鈕點擊事件
  prevButton.addEventListener('click', goToPrevSlide);
  nextButton.addEventListener('click', goToNextSlide);
  themeButton.addEventListener('click', toggleTheme);

});
