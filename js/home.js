let elForm = document.querySelector("form");
let elInput = document.querySelector("#text");
let elList = document.querySelector(".products");
let showingNumber = document.querySelector(".showingNumber");
let btnNum = document.querySelector(".transfer");
let btnNext = document.querySelector(".next");
let btnPrev = document.querySelector(".prev");
let btnNum1 = document.querySelector(".num1");
let btnNum2 = document.querySelector(".num2");
let btnNum3 = document.querySelector(".num3");
let btnNum4 = document.querySelector(".num4");
let btnNum5 = document.querySelector(".num5");
let btnNum6 = document.querySelector(".num6");
let btnNum7 = document.querySelector(".num7");
let btnNum8 = document.querySelector(".num8");
let btnNum9 = document.querySelector(".num9");
let btnNum10 = document.querySelector(".num10");
let btnAlls = document.querySelectorAll(".toBasket")


let logout = document.querySelectorAll(".logout");

const userId = localStorage.getItem("token");
if (!userId) location.replace("./index.html");










btnNext.addEventListener("click", () => {
  let runW = btnNum10.innerHTML * 1;
  let run = showingNumber.innerHTML * 1;
  if (0 === run / 6 || runW > Math.ceil(run / 6)){
    return false;
  }
  btnNum1.innerHTML = btnNum1.innerHTML * 1 + 10;
  btnNum2.innerHTML = btnNum2.innerHTML * 1 + 10;
  btnNum3.innerHTML = btnNum3.innerHTML * 1 + 10;
  btnNum4.innerHTML = btnNum4.innerHTML * 1 + 10;
  btnNum5.innerHTML = btnNum5.innerHTML * 1 + 10;
  btnNum6.innerHTML = btnNum6.innerHTML * 1 + 10;
  btnNum7.innerHTML = btnNum7.innerHTML * 1 + 10;
  btnNum8.innerHTML = btnNum8.innerHTML * 1 + 10;
  btnNum9.innerHTML = btnNum9.innerHTML * 1 + 10;
  btnNum10.innerHTML = btnNum10.innerHTML * 1 + 10;
});
btnPrev.addEventListener("click", () => {
  let run = btnNum1.innerHTML * 1;
  if (run === 1) {
    return false;
  }
  btnNum1.innerHTML = btnNum1.innerHTML * 1 - 10;
  btnNum2.innerHTML = btnNum2.innerHTML * 1 - 10;
  btnNum3.innerHTML = btnNum3.innerHTML * 1 - 10;
  btnNum4.innerHTML = btnNum4.innerHTML * 1 - 10;
  btnNum5.innerHTML = btnNum5.innerHTML * 1 - 10;
  btnNum6.innerHTML = btnNum6.innerHTML * 1 - 10;
  btnNum7.innerHTML = btnNum7.innerHTML * 1 - 10;
  btnNum8.innerHTML = btnNum8.innerHTML * 1 - 10;
  btnNum9.innerHTML = btnNum9.innerHTML * 1 - 10;
  btnNum10.innerHTML = btnNum10.innerHTML * 1 - 10;
});

let activePage = 0;
let kino = "";
btnNum.addEventListener("click", (evt) => {
  if (!kino) {
    return false;
  }
  order = evt.srcElement.textContent;
  order = order * 6;
  console.log(order);
  console.log(kino);
  renderFetch(kino, order);
});
// Debounce function
const filterProducts = debounce((text) => {
  kino = text;
  if (!text) {
    elList.innerHTML = "";
    return false;
  }
  renderFetch(text, activePage);
}, 1000);

elInput.addEventListener("input", (e) => {
  filterProducts(e.target.value);
});
function debounce(cb, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
// Api
async function renderFetch(a, b) {
  let resolve = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${a}&startIndex=${b}&maxResults=6&orderBy=newest`
  );
  let data = await resolve.json();
  showingNumber.innerHTML = data.totalItems;
  renderFilm(data.items);
}

function renderFilm(arr) {
  elList.innerHTML = "";
  arr.forEach((el) => {
    let productItem = document.createElement("div");
    productItem.classList.add("productItem");
    let proImg = document.createElement("img");
    proImg.src = el.volumeInfo.imageLinks.smallThumbnail;
    let proH2 = document.createElement("h2");
    proH2.innerHTML = el.volumeInfo.title;
    let proH3 = document.createElement("h3");
    proH3.innerHTML = el.volumeInfo.authors;
    let proH4 = document.createElement("h4");
    proH4.innerHTML = el.volumeInfo.publishedDate;
    let proItemLink = document.createElement("div");
    proItemLink.classList.add("proItemLink");
    let toBasket = document.createElement("button");
    toBasket.classList.add("toBasket");
    toBasket.setAttribute("data-id", el.id);
    toBasket.innerHTML = "Bookmark";
    let toInfo = document.createElement("a");
    toInfo.classList.add("toInfo");
    toInfo.innerHTML = "More Info";
    let toRead = document.createElement("a");
    toRead.classList.add("toRead");
    toRead.innerHTML = "Read";
    proItemLink.append(toBasket, toInfo);
    productItem.append(proImg, proH2, proH3, proH4, proItemLink, toRead);
    elList.append(productItem);
  });
}


