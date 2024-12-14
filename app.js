import Figure from "./components/Figure.js";
import { getAPI } from "./util/getAPI.js";

window.addEventListener("DOMContentLoaded", () => {
    initFeed();
});

async function initFeed(params) {
    const $gridColumns = document.querySelectorAll(".grid--column");
    const data = await getAPI();
    let columnIndex = 0;

    data.forEach((element) => {
        $gridColumns[columnIndex].appendChild(Figure(element));
        columnIndex++;
        if (columnIndex > 2) {
            columnIndex = 0;
        }
    });
}
