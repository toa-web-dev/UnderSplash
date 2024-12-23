import FeedItem from "./components/FeedItem.js";
import getAPI from "./util/getAPI.js";
import initIO from "./util/intersectionIO.js";
const appState = {
    columnNumber: 1,
    feedItemArray: [],
    $targetPicture: null,
};

/**
 * @description 데이터를 응답 받아 피드에 추가할 아이템으로 전역변수 배열에 추가합니다.
 */
async function fetchingData() {
    const data = await getAPI();
    //Figure 컴포넌트가 요소인 배열을 만든다
    data.forEach((data) => {
        appState.feedItemArray.push(FeedItem(data));
    });
}

/**
 * @description 호출 당시의 뷰포트 너비를 기준으로 메인피드 그리드에 추가할 컬럼의 수를 반환합니다.
 * @returns {number} 1 || 2 || 3
 */
function calculateColumnNumber() {
    if (window.innerWidth <= 425) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else return 3;
}

/**
 * @description 메인 피드에 사용 될 그리드의 컬럼을 전부 제거한 뒤, 컬럼을 새로 생성합니다.
 * @param {number} columnNumber
 */
function initGrid(columnNumber) {
    const $grid = document.querySelector(".main__grid-container");
    $grid.replaceChildren("");
    for (let i = 0; i < columnNumber; i++) {
        const $column = document.createElement("div");
        $column.classList.add("main__grid-column");
        $grid.appendChild($column);
    }
}

/**
 * @description 무한 스크롤링을 위한 intersection observer 인스턴스를 생성하고,
 *  해당 인스턴스로 피드 아이템을 추가하는  fillItem 함수를 반환합니다.
 * @returns {Function} fillItem
 */
function getFillItem() {
    let $lastTargetPicture = null;
    const io = initIO($lastTargetPicture, () => {
        fetchingData().then(fillItem);
    });

    return function fillItem() {
        const gridColumnsArray = [...document.querySelectorAll(".main__grid-column")];

        // 각 열에 feedItem을 추가합니다.
        appState.feedItemArray.forEach((feedItem, idx) => {
            gridColumnsArray[idx % gridColumnsArray.length].appendChild(feedItem);
        });

        // feedItem을 추가한뒤 가장 짧은 열을 찾습니다.
        const shortestColumnIndex = gridColumnsArray
            .map((el) => el.offsetHeight)
            .reduce((minIndex, currentValue, currentIndex, arr) => {
                return arr[minIndex] <= currentValue ? minIndex : currentIndex;
            }, 0);
        const shortestColumn = gridColumnsArray[shortestColumnIndex];

        // 가장 짧은 열의 마지막 FeedItem이 IO의 관측대상이 됩니다.
        const $newTargetPicture = shortestColumn.lastChild;

        // 관측대상을 최신화합니다.
        if ($lastTargetPicture) io.unobserve($lastTargetPicture);
        io.observe($newTargetPicture);
        $lastTargetPicture = $newTargetPicture;
    };
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
