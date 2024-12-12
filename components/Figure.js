/**
 *
 * @param {JSON} data
 * @returns {HTMLElement} 
 */
export default function Figure(data) {
    /*
    <figure>
      <picture>
        <source srcset="/media/cc0-images/surfer-240-200.jpg" media="(orientation: portrait)">
        <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="설명 이미지">
      </picture>
      <figcaption>
        <h2>작가</h2>
      </figcaption>
    </figure>
  */
    const $figure = document.createElement("figure");
    const $picture = document.createElement("picture");
    const $picure__source = document.createElement("source")
    const $picture__img = document.createElement("img")
    
    const $figcap = document.createElement("figcaption");

    $figure.append($picture, $figcap);
}
