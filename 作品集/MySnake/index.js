/*
          1.禁止掉頭
          2.遊戲終止
          3.計分
      */
//獲取蛇
const snake = document.getElementById("snake");
//獲取蛇的各個部分
const snakes = snake.getElementsByTagName("div");

//獲取食物
const food = document.getElementById("food");
// 獲取分數和level的span
const scoreSpan = document.getElementById("score");
const levelSpan = document.getElementById("level");
// 創建變量來存儲分數和等級
let score = 0;
let level = 0;
/*
          食物的坐標應該在0-290之間
      */
function changeFood() {
  // 生成0-29的隨機數*10
  const x = Math.floor(Math.random() * 30) * 10;
  const y = Math.floor(Math.random() * 30) * 10;
  //設置食物的坐標
  food.style.left = x + "px";
  food.style.top = y + "px";
}
changeFood();
//定義一個變量來存儲蛇的移動方向
let dir;

//創建一個變量來記錄按鍵的狀態
let keyActive = true;
/*
          綁定按鍵事件 keydown keyup
              -鍵盤事件只能綁定給可以獲取焦點的元素或是document
      */
const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

// 創建一個對象
reObj = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
};
/*
          遊戲禁止掉頭:
              構成的要件:
                1.身體超過2
                2.不能是相反方向
              處理:
                保持原來的方向不變(不修改dir的值)
      */
document.addEventListener("keydown", (e) => {
  //設置方向
  if (keyActive && keyArr.includes(e.key)) {
    if (snakes.length < 2 || reObj[dir] !== e.key) {
      dir = e.key;
      keyActive = false;
      // 如果当前方向是 "ArrowUp"（向上），那么反方向是 "ArrowDown"（向下）。
      // 如果玩家按下 "ArrowDown" 键，那么 reObj[dir] 将等于 "ArrowDown"，这与新方向 "ArrowDown" 相同，
      // 所以不允许改变方向。但如果玩家按下 "ArrowLeft" 键，
      // 那么 reObj[dir] 将等于 "ArrowRight"，这与新方向 "ArrowLeft" 不同，
      // 所以允许改变方向。这样的设计确保了游戏的连续性和玩法。
    }
  }
});
/*
          要使得身體可以和頭一起移動，只需要在蛇移動時，變換蛇尾巴的位置
      */

setTimeout(function move() {
  //獲取蛇頭

  const head = snakes[0];
  // 獲取蛇頭的坐標
  let x = head.offsetLeft;
  let y = head.offsetTop;
  switch (dir) {
    case "ArrowUp":
      // head.style.top = head.offsetTop - 10 + "px";
      y -= 10;
      break;
    case "ArrowDown":
      y += 10;
      break;
    case "ArrowLeft":
      x -= 10;
      break;
    case "ArrowRight":
      x += 10;
      break;
  }
  //檢查蛇是否吃到食物
  if (
    head.offsetTop === food.offsetTop &&
    head.offsetLeft === food.offsetLeft
  ) {
    // 1.改變食物的位置 2.增加蛇的身體
    changeFood();
    snake.insertAdjacentHTML("beforeend", " <div></div>");
    score++;
    scoreSpan.innerText = score;
    // 檢查等級
    if (score % 3 === 0 && level < 5) {
      level++;
      levelSpan.innerText = level + 1;
    }
  }
  /*
          判斷遊戲是否結束:
            1.撞牆
            2.撞自己
        */
  //  判斷是否撞牆
  if (x < 0 || x > 290 || y < 0 || y > 290) {
    alert("撞牆了!遊戲結束!");
    return;
  }
  // 判斷是否撞到自己
  for (let i = 0; i < snakes.length - 1; i++) {
    if (snakes[i].offsetLeft === x && snakes[i].offsetTop === y) {
      alert("撞到自己了!遊戲結束");
      return;
    }
  }
  // 獲取尾巴
  const tail = snakes[snakes.length - 1];
  // 移動蛇的位置
  tail.style.left = x + "px";
  tail.style.top = y + "px";
  // 將尾巴移動到舌頭的位置
  snake.insertAdjacentElement("afterbegin", tail);
  keyActive = true;
  setTimeout(move, 120 - level * 15);
}, 120);
