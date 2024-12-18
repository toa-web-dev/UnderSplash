import FeedItem from "./components/FeedItem.js";
import { getAPI } from "./util/getAPI.js";
import initIO from "./util/intersectionIO.js";

window.addEventListener("DOMContentLoaded", () => {
    initFeed();
});

async function initFeed(params) {
    appendFeedItem().then(() => {
        const $IO = document.createElement("div");
        $IO.classList.add("io");
        document.querySelector("#main__wrapper").appendChild($IO);

        const IO = initIO(appendFeedItem);
        IO.observe($IO);
    });
}
async function appendFeedItem() {
    const data = await getAPI();
    const $gridColumns = document.querySelectorAll(".grid--column");
    let columnIndex = 0;
    data.forEach((element) => {
        $gridColumns[columnIndex].appendChild(FeedItem(element));
        columnIndex++;
        if (columnIndex > 2) {
            columnIndex = 0;
        }
    });
}
