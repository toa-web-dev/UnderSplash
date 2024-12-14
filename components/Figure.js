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

    console.log(data);

    const $figure = document.createElement("figure");

    const $picture = document.createElement("picture");

    const $sourceDesktop = document.createElement("source");
    $sourceDesktop.srcset = data.download_url;
    $sourceDesktop.media = `(min-width: ${parseInt(data.width.tablet) + 1}px)`;

    const $sourceTablet = document.createElement("source");
    $sourceTablet.srcset = data.download_url_tablet;
    $sourceTablet.media = `(max-width: ${data.width.tablet}px) and (min-width:${parseInt(data.width.mobile + 1)}px)`;

    const $sourceMobile = document.createElement("source");
    $sourceMobile.srcset = data.download_url_mobile;
    $sourceMobile.media = `(max-width: ${data.width.mobile}px)`;

    const $img = document.createElement("img");
    $img.src = data.download_url_mobile;
    $img.alt = "이미지 설명";
    $picture.append($sourceDesktop, $sourceTablet, $sourceMobile, $img);

    const $figcap = document.createElement("figcaption");
    $figcap.innerHTML = `<b>${data.author}</b>`;
    $figure.append($picture, $figcap);
    return $figure;
}
