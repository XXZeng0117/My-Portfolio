/*
          獲取五個點
       */
const dots = Array.from(document.querySelectorAll(".dot a"));
const imgArr = Array.from(document.querySelectorAll(".img-list li"));
document.addEventListener("click", (e) => {
  const index = dots.indexOf(e.target);
  if (index !== -1) {
    changeImg(index);
  }
});
/* 自動切換圖片 */
//建立一個閉包
const toggleChange = (function () {
  let timer = null;
  return function () {
    if (timer === null) {
      timer = setTimeout(function auto() {
        changeImg("next");
        timer = setTimeout(auto, 1500);
      }, 1500);
    } else {
      clearTimeout(timer);
      timer = null;
    }
  };
})();

toggleChange();

//獲取outer
const outer = document.getElementsByClassName("outer")[0];
outer.addEventListener("mouseenter", function () {
  toggleChange();
});

outer.addEventListener("mouseleave", function () {
  toggleChange();
});

/* 點擊按鈕切換圖片 */
const prev = document.getElementById("prev");
prev.addEventListener("click", function () {
  changeImg("prev");
});

const next = document.getElementById("next");
next.addEventListener("click", function () {
  changeImg("next");
});
/*
                    changeImg 用來切換圖片
                    參數:
                      dir 切換圖片的方向
                          next
                          prev
                */
function changeImg(dir) {
  // 獲取當前顯示的圖片
  const current = document.querySelector(".img-list .current"); //獲取當前顯示的圖片

  //獲取下一個圖片
  let next;
  if (dir === "next") {
    next = current.nextElementSibling || imgArr[0];
  } else if (dir === "prev") {
    next = current.previousElementSibling || imgArr.at(-1);
    //document.querySelector("li:last-child");
  } else if (typeof dir === "number") {
    next = imgArr[dir];
  }
  //獲取要顯示的圖片的索引
  const index = imgArr.indexOf(next);
  //獲取下一個圖片
  current.classList.remove("current");
  next.classList.add("current");

  //切換active
  const currentActive = document.querySelector(".activePic");
  currentActive.classList.remove("activePic");

  //獲取到當前要顯示的小點
  dots[index].classList.add("activePic");
}
