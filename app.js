import Figure from "./components/Figure.js";
import { getAPI } from "./util/getAPI.js";
import initIO from "./util/intersectionIO.js";

window.addEventListener("DOMContentLoaded", () => {
    initFeed();
    console.log(document.querySelector("#main_wrapper"));
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

    let options = {
        root: document.querySelector("#main_wrapper"),
        rootMargin: "1000px 0px 0px 0px",
        threshold: 0,
    };

    const io = new IntersectionObserver((entries, io) => {
        console.log("감지됨", io);

        console.log(entries);
        if (entries[0].isIntersecting) {
            console.log("api 불러옴");

        }

    }, options)

    const $IO = document.createElement("div")
    $IO.classList.add("io")
    document.querySelector("#main__wrapper").appendChild($IO)
    io.observe($IO)
    // IO.observe($IO)
}
