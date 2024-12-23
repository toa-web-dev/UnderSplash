import FeedItem from "./components/FeedItem.js";
import { getAPI } from "./util/getAPI.js";
// import initIO from "./util/intersectionIO.js";

const appState = {
    columnNumber: 1,
    feedItemArray: [],
    $targetPicture: null,
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
const fillItem = getFillItem();
window.addEventListener("DOMContentLoaded", async () => {
    const columnNumber = calculateColumnNumber();
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

function getFillItem() {
    let $lastTargetPicture = null;
    const option = {
        root: $lastTargetPicture,
        rootMargin: "0px",
        threshold: 0,
    };
    const io = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            console.log("감지됨: ", entry);
            //다음 페이지 데이터 fetching
            fetchingData().then(fillItem);
        }
    }, option);

    function fillItem() {
        const $gridColumns = document.querySelectorAll(".main__grid-column");

        appState.feedItemArray.forEach((element, idx) => {
            $gridColumns[idx % $gridColumns.length].appendChild(element);
        });
        const filter = appState.feedItemArray.filter((el, idx, arr) => {
            if ($gridColumns.length === 1) {
                return idx === arr.length - 1;
            }
            if ($gridColumns.length === 2) {
                return idx % 2 === 1;
            }
            if ($gridColumns.length === 3) {
                return idx % 3 === 2;
            }
        });
        const $newTargetPicture = filter[filter.length - 1];
        // console.log("$targetPicture은 ", $targetPicture);
        //  $targetPicutre를 IO에서 observe, unObserve 해서 관측대상을 최신화합니다.
        console.log(1,$lastTargetPicture);
        
        if ($lastTargetPicture) io.unobserve($lastTargetPicture);
        io.observe($newTargetPicture);
        $lastTargetPicture = $newTargetPicture;
        console.log(2,$lastTargetPicture);
        
    }
    return fillItem;
}
