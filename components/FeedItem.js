import Figure from "./Figure.js";
import Modal from "./Modal.js";

/**
 * @param {JSON} data
 * @returns {HTMLElement}
 */
export default function FeedItem(data) {
    const { $figure, $picture, $figcap } = Figure(data);

    // $figure.appendChild($picture);

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
/*
  <figure>
    <picture>
      <source srcset="/media/cc0-images/surfer-240-200.jpg" media="(orientation: portrait)">
      <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="설명 이미지">
    </picture>
  </figure>
*/
