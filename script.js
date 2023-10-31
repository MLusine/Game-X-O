let playWithComp = false;
let inpPopupCalled = false;
let inpPopup;

function create_matrix() {
  let inp = document.getElementById("input");
  let inp_val = parseInt(inp.value);
  let main = document.querySelector(".main");
  let wrapper = document.createElement("div");
  wrapper.classList.add("content");
  let Player = "X";
  let gamerX;
  let gamerO;
  let gamer1, gamer2;
  function gamers() {
    gamer1 = document.createElement("div");
    gamer1.classList.add("gamer1");
    gamer1.textContent = "X";

    gamer2 = document.createElement("div");
    gamer2.classList.add("gamer2");
    gamer2.textContent = "O";
  }
  gamers();

  let Human = "";
  let Robot = "";
  if (playWithComp && inp_val) {
    let rand = Math.round(Math.random() * 1);

    Player = rand == 0 ? "O" : "X";
    gamer1.textContent = Player;
    gamer2.textContent = gamer1.textContent == "O" ? "X" : "O";

    if (rand == 0) {
      Human = "O";
      Robot = "X";
    } else {
      Human = "X";
      Robot = "O";
    }

    let you = document.createElement("p");
    you.classList.add("message");
    you.textContent =
      "You are Player " + Human + "  and play with Robot " + Robot;

    main.append(you);
  }

  let timeX, time0;
  let timerX, timerO;
  let m;
  function times() {
    timeX = document.createElement("h3");
    timeX.style.fontSize = "18px";
    timerX = 0;
    m = 0;
    timeX.textContent = m + "." + "0" + timerX;

    time0 = document.createElement("h3");
    time0.style.fontSize = "18px";
    timerO = 0;
    time0.textContent = m + "." + "0" + timerO;
  }
  times();

  gamer1.append(timeX);
  wrapper.append(gamer1);

  function PlayerOne() {
    gamerX = setInterval(() => {
      timerX++;
      if (timerX <= 9) {
        timeX.textContent = m + "." + "0" + timerX;
      } else {
        timeX.textContent = m + "." + timerX;
        if (timerX == 60) {
          m++;
          timerX = 0;
        }
      }
    }, 1000);
  }

  PlayerOne();

  function PlayerTwo() {
    gamerO = setInterval(() => {
      timerO++;
      time0.textContent = m + "." + (timerO <= 9 ? "0" : "") + timerO;
      if (timerO == 60) {
        m++;
        timerO = 0;
      }
    }, 1000);
  }
  if (!PlayerOne) {
    PlayerTwo();
  }
  let table = document.createElement("table");

  for (let i = 0; i < 1; i++) {
    let row = document.createElement("tr");
    for (let ind = 0; ind <= inp_val; ind++) {
      let th = document.createElement("th");
      let letters = " ABCDEFGH";
      th.textContent = letters[ind];
      row.append(th);
    }
    table.append(row);
  }
  let numbers;

  for (let i = 0; i < inp_val; i++) {
    let row = document.createElement("tr");
    numbers = "01234567";
    row.textContent = numbers[i];
    row.style.height = "70px";

    for (let j = 0; j < inp_val; j++) {
      let cell = document.createElement("td");

      cell.style.border = "1px solid #048504";
      cell.style.width = "70px";

      row.append(cell);
    }

    table.append(row);
  }
  wrapper.append(table);
  gamer2.append(time0);
  wrapper.append(gamer2);

  if (inp_val) {
    main.append(wrapper);
  } else {
    inputPopup();
  }

  let cells = document.querySelectorAll("td");
  let count = 0;
  let abc = document.querySelectorAll("th");
  let k = [];
  let f = [];
  function ABCD() {
    for (let i = 1; i < abc.length; i++) {
      k.push(abc[i].textContent);
    }

    for (let i = 0, j = 0; i < cells.length; i++, j++) {
      if (j == inp_val) {
        j = 0;
      }
      let y = k[j];
      f[i] = y;
    }
  }
  ABCD();
  let playmoves = {};

  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add("cells");
    let p = 0;

    let randIndex = Math.round(Math.random() * i);
    cells[i].addEventListener("click", () => {
      if (!cells[i].textContent) {
        cells[i].textContent = Player;
        count++;
        p += count;

        let z = event.target.parentNode.rowIndex - 1;

        let clock = Player == "X" ? timeX.textContent : time0.textContent;
        playmoves[p] = f[i] + z + " - " + clock + " : " + Player;

        let horizontalWin = checkHorizontalWin(cells, inp_val);
        let verticalWin = checkVerticalWin(cells, inp_val);
        let diagonalWin = checkDiagonalWin(cells, inp_val);
        let antiDiagonalWin = checkAntiDiagonalWin(cells, inp_val);

        if (horizontalWin || verticalWin || diagonalWin || antiDiagonalWin) {
          if (horizontalWin) {
            PopUp(horizontalWin);
          } else if (verticalWin) {
            PopUp(verticalWin);
          } else if (diagonalWin) {
            PopUp(diagonalWin);
          } else {
            PopUp(antiDiagonalWin);
          }
        }

        function checkDraw(cells) {
          for (let i = 0; i < cells.length; i++) {
            if (!cells[i].textContent) {
              return false;
            }
          }
          return true;
        }

        if (count >= inp_val * 2 - 1) {
          let result = checkDraw(cells);
          if (result) {
            PopUpDraw();
          }
        }

        if (!playWithComp) {
          if (Player === "X") {
            clearInterval(gamerX);
            PlayerTwo();
            Player = "O";
          } else {
            clearInterval(gamerO);
            PlayerOne();
            Player = "X";
          }
        }
        if (playWithComp && (Player === "O" || Player === "X")) {
          clearInterval(gamerX);
          PlayerTwo();
          setTimeout(() => {
            robot();
            clearInterval(gamerO);
            PlayerOne();
          }, 1000);
        }
      }
    });

    function robot() {
      if (!cells[randIndex].textContent) {
        cells[randIndex].textContent = Player == "X" ? "O" : "X";
      } else {
        cells[randIndex + 1].textContent = Player == "X" ? "O" : "X";
      }
    }
  }
  function checkHorizontalWin(cells, inp_val) {
    for (let row = 0; row < inp_val; row++) {
      let startCell = cells[row * inp_val];
      if (!startCell.textContent) continue;
      let currentPlayer = startCell.textContent;
      let win = true;

      for (let col = 1; col < inp_val; col++) {
        let cell = cells[row * inp_val + col];
        if (cell.textContent !== currentPlayer) {
          win = false;
          break;
        }
      }

      if (win) {
        return currentPlayer;
      }
    }
  }

  function checkVerticalWin(cells, inp_val) {
    for (let col = 0; col < inp_val; col++) {
      let startCell = cells[col];
      if (!startCell.textContent) continue;
      let currentPlayer = startCell.textContent;
      let win = true;

      for (let row = 1; row < inp_val; row++) {
        let cell = cells[col + row * inp_val];
        if (cell.textContent !== currentPlayer) {
          win = false;
          break;
        }
      }

      if (win) {
        return currentPlayer;
      }
    }
  }

  function checkDiagonalWin(cells, inp_val) {
    let startCell = cells[0];
    if (!startCell.textContent) return null;

    let currentPlayer = startCell.textContent;

    for (let i = 1; i < inp_val; i++) {
      let cell = cells[i * (inp_val + 1)];
      if (cell.textContent !== currentPlayer) return null;
    }

    return currentPlayer;
  }

  function checkAntiDiagonalWin(cells, inp_val) {
    let startCell = cells[inp_val - 1];
    if (!startCell.textContent) return null;

    let currentPlayer = startCell.textContent;

    for (let i = 1; i < inp_val; i++) {
      let cell = cells[(i + 1) * (inp_val - 1)];
      if (cell.textContent !== currentPlayer) return null;
    }

    return currentPlayer;
  }

  function checkWinner(cells, inp_val) {
    let horizontalWin = checkHorizontalWin(cells, inp_val);
    if (horizontalWin) {
      return horizontalWin;
    }

    let verticalWin = checkVerticalWin(cells, inp_val);
    if (verticalWin) {
      return verticalWin;
    }

    let diagonalWin = checkDiagonalWin(cells, inp_val);
    if (diagonalWin) {
      return diagonalWin;
    }

    let antiDiagonalWin = checkAntiDiagonalWin(cells, inp_val);
    if (antiDiagonalWin) {
      return antiDiagonalWin;
    }
    return null;
  }

  function PopUp(currentPlayer) {
    let cont = document.getElementById("container");
    cont.classList.add("cont");

    let popup = document.createElement("div");
    let popupHeader = document.createElement("h3");
    popupHeader.textContent = "Winner is " + currentPlayer;
    popupHeader.classList.add("popupHeader");

    let txt = document.createElement("p");
    let i = 0;
    for (const key in playmoves) {
      i++;
      let m = playmoves[key];

      txt.innerHTML += i + ". " + m + "<br>";
    }
    txt.classList.add("playmoves");

    let div = document.createElement("div");
    let quit = document.createElement("button");
    quit.textContent = "Quit";

    let play = document.createElement("button");
    play.textContent = "Play";

    quit.classList.add("btn", "buttons");
    play.classList.add("btn", "buttons");
    popup.classList.add("popup");

    popup.append(popupHeader);
    popup.append(txt);
    div.append(quit, play);
    popup.append(div);
    document.body.append(popup);

    quit.addEventListener("click", () => {
      location.reload();
    });
    play.addEventListener("click", () => {
      popup.remove();
      cont.classList.remove("cont");
      wrapper.remove();
      create_matrix();
    });
  }
  function PopUpDraw() {
    let d = document.createElement("div");
    d.classList.add("popup");
    d.classList.add("drawpopup");
    let p = document.createElement("p");
    p.classList.add("p");
    p.textContent = "It's a draw!";

    let cont = document.getElementById("container");
    cont.classList.add("cont");

    let c = document.createElement("div");
    let quit = document.createElement("button");
    quit.textContent = "Quit";

    let play = document.createElement("button");
    play.textContent = "Play";

    quit.classList.add("btn", "buttons");
    play.classList.add("btn", "buttons");

    c.append(quit, play);
    d.append(p);
    d.append(c);
    document.body.append(d);

    quit.addEventListener("click", () => {
      location.reload();
    });
    play.addEventListener("click", () => {
      d.remove();
      cont.classList.remove("cont");
      wrapper.remove();
      create_matrix();
    });
  }
  function inputPopup() {
    inpPopupCalled = true;
    let inputPopup = document.createElement("div");
    inputPopup.classList.add("popup");
    let p = document.createElement("p");
    p.textContent = "Input Number";
    p.classList.add("p", "inpN");

    inputPopup.append(p);
    document.body.append(inputPopup);
  }
  if (inpPopupCalled) {
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}

function PlayWithComputer() {
  playWithComp = true;
  create_matrix();
}
