import FeedItem from "./components/FeedItem.js";
import { getAPI } from "./util/getAPI.js";
import initIO from "./util/intersectionIO.js";

let columnNumber;
window.addEventListener("DOMContentLoaded", () => {
    // initFeed();

    if (window.innerWidth <= 425) {
        columnNumber = 1;
    } else if (window.innerWidth <= 768) {
        columnNumber = 2;
    } else {
        columnNumber = 3;
    }
});

window.addEventListener("resize", () => {
    let newColumnNumber;
    if (window.innerWidth <= 425) {
        newColumnNumber = 1;
    } else if (window.innerWidth <= 768) {
        newColumnNumber = 2;
    } else {
        newColumnNumber = 3;
    }

    // columnNumber가 변할때 컬럼의 수를 변경하고, FeedItem을 다시 append한다.
    if (columnNumber === newColumnNumber) return;
    columnNumber = newColumnNumber;

    const $grid = document.querySelector(".main__grid-container");
    $grid.replaceChildren(""); // $grid의 내부를 비운다

    //columnNumber 만큼 grid의 열을 추가한다.
    for (let i = 0; i < columnNumber; i++) {
        const $column = document.createElement("div");
        $column.classList.add("main__grid-column");
        $grid.appendChild($column);
    }
});
// function initFeed(params) {

// }
// async function name(params) {
//     const data = await getAPI();

//     //Figure 컴포넌트가 요소인 배열을 만든다
//     const feedItemArray = [];
//     data.forEach((data) => {
//         feedItemArray.push(FeedItem(data));
//     });

//     const $gridColumns = document.querySelectorAll(".main__grid-column");

//     data.forEach((element, idx) => {
//         $gridColumns[idx % $gridColumns.length].appendChild(FeedItem(element));
//     });
// }
