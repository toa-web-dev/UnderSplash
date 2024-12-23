import FeedItem from "./components/FeedItem.js";
import { getAPI } from "./util/getAPI.js";
// import initIO from "./util/intersectionIO.js";

const appState = {
    columnNumber: 1,
    feedItemArray: [],
    $targetPicture: null
};

async function fetchingData(params) {
    const data = await getAPI();
    //Figure 컴포넌트가 요소인 배열을 만든다
    data.forEach((data) => {
        appState.feedItemArray.push(FeedItem(data));
    });
}

function calculateColumnNumber(params) {
    if (window.innerWidth <= 425) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else return 3;
}


function initGrid(columnNumber) {
    const $grid = document.querySelector(".main__grid-container");
    $grid.replaceChildren(""); // $grid의 내부를 비운다

    //appState.columnNumber 만큼 grid의 열을 추가한다.
    for (let i = 0; i < columnNumber; i++) {
        const $column = document.createElement("div");
        $column.classList.add("main__grid-column");
        $grid.appendChild($column);
    }
}


function fillItem() {
    const $gridColumns = document.querySelectorAll(".main__grid-column");

    appState.feedItemArray.forEach((element, idx) => {
        $gridColumns[idx % $gridColumns.length].appendChild(element);

    });
    const filter = appState.feedItemArray.filter((el, idx, arr) => {
        if ($gridColumns.length === 1) {
            return idx === arr.length - 1
        }
        if ($gridColumns.length === 2) {
            return idx % 2 === 1
        }
        if ($gridColumns.length === 3) {
            return idx % 3 === 2
        }

    })
    const $targetPicture = filter[filter.length - 1]
    // console.log("$targetPicture은 ", $targetPicture);
    //  $targetPicutre를 IO에서 observe, unObserve 해서 관측대상을 최신화합니다.
}

window.addEventListener("DOMContentLoaded", async () => {
    const columnNumber = calculateColumnNumber()
    appState.columnNumber = calculateColumnNumber();

    initGrid(columnNumber);
    fetchingData().then(fillItem);
});

window.addEventListener("resize", () => {
    const newColumnNumber = calculateColumnNumber();
    if (appState.columnNumber === newColumnNumber) return;
    appState.columnNumber = newColumnNumber;

    initGrid(newColumnNumber);
    fillItem();
});

function initIO($targetPicture) {
    const option = {
        root: $targetPicture,
        rootMargin: "0px",
        threshold: 0,
    }
    const io = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            console.log("감지됨");
            //다음 페이지 데이터 fetching
            observer.unobserve($targetPicture)
            //현재 타겟 이미지 unobserve
            //다음 타겟 이미지 observe
        }
    }, option)
    function set() {
        io.observer
    }
}