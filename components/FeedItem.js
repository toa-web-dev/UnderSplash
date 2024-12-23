import Figure from "./Figure.js";
import Modal from "./Modal.js";

/**
 * @param {JSON} data
 * @returns {HTMLElement}
 */
export default function FeedItem(data) {
    const { $figure, $picture, $figcap } = Figure(data);

    $figure.appendChild($picture);

    const img = $picture.getElementsByTagName("img")[0];
    img.addEventListener("load", () => {
        $picture.onclick = () => {
            document.body.insertBefore(
                Modal($picture.cloneNode(true), $figcap.cloneNode(true)),
                document.body.firstElementChild
            );
        };
    });

    return $figure;
}