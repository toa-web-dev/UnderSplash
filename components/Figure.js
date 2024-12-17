import Modal from "./Modal.js";

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
  $figure.classList.add("skeleton");
  $figure.style.aspectRatio = data.width / data.height;

  const $picture = document.createElement("picture");
  $picture.classList.add("hidden", "picture");

  const $sourceDesktop = document.createElement("source");

  const $sourceTablet = document.createElement("source");

  const $sourceMobile = document.createElement("source");

  const $img = document.createElement("img");
  $img.src = data.download_url_mobile;
  $img.alt = "이미지 설명";
  $img.onload = () => {
    $picture.classList.remove("hidden");
    $figure.classList.remove("skeleton");
    $picture.onclick = () => {
      document.body.insertBefore(Modal($picture.cloneNode(true)), document.body.firstElementChild)
    }
  };

  $picture.append($sourceDesktop, $sourceTablet, $sourceMobile, $img);

  const $figcap = document.createElement("figcaption");
  $figcap.innerHTML = `<b>${data.author}</b>`;
  $figure.append($picture, $figcap);

  $sourceDesktop.srcset = data.download_url;
  $sourceDesktop.media = `(min-width: ${parseInt(data.deviceWidth.tablet) + 1}px)`;

  $sourceTablet.srcset = data.download_url_tablet;
  $sourceTablet.media = `(max-width: ${data.deviceWidth.tablet}px) and (min-width:${parseInt(
    data.deviceWidth.mobile + 1
  )}px)`;

  $sourceMobile.srcset = data.download_url_mobile;
  $sourceMobile.media = `(max-width: ${data.deviceWidth.mobile}px)`;

  return $figure;
}
