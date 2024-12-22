import FeedItem from "./components/FeedItem.js";
import { getAPI } from "./util/getAPI.js";
import initIO from "./util/intersectionIO.js";

const appState = {
    columnNumber: 1,
    feedItemArray: [],
};

async function fetchingData(params) {
    const data = await getAPI();

    //Figure 컴포넌트가 요소인 배열을 만든다
    data.forEach((data) => {
        appState.feedItemArray.push(FeedItem(data));
        console.log(appState.feedItemArray);
    });
}

function fillItem() {
    const $gridColumns = document.querySelectorAll(".main__grid-column");

    appState.feedItemArray.forEach((element, idx) => {
        $gridColumns[idx % $gridColumns.length].appendChild(element);
    });
}

function initGrid(params) {
    const $grid = document.querySelector(".main__grid-container");
    $grid.replaceChildren(""); // $grid의 내부를 비운다

    //appState.columnNumber 만큼 grid의 열을 추가한다.
    for (let i = 0; i < appState.columnNumber; i++) {
        const $column = document.createElement("div");
        $column.classList.add("main__grid-column");
        $grid.appendChild($column);
    }
}

function calculateColumnNumber(params) {
    if (window.innerWidth <= 425) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else return 3;
}

window.addEventListener("DOMContentLoaded", async () => {
    appState.columnNumber = calculateColumnNumber();

    initGrid();
    fetchingData().then(fillItem);
});

window.addEventListener("resize", () => {
    const newColumnNumber = calculateColumnNumber();
    if (appState.columnNumber === newColumnNumber) return;

    appState.columnNumber = newColumnNumber;

    initGrid();
    fillItem();
});
