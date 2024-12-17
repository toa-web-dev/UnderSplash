export default function Modal($picture, $figcap) {
    const $modal = document.createElement("div");
    $modal.id = "modal__container";

    const $wrapper = document.createElement("div");
    $wrapper.classList.add("modal__top--wrapper");

    const $pictureWrapper = document.createElement("div");
    $pictureWrapper.classList.add("modal__picture--wrapper");

    $figcap.classList.add("modal__figcap--wrapper")

    $pictureWrapper.appendChild($picture);
    $wrapper.append($figcap, $pictureWrapper );
    $modal.appendChild($wrapper);

    $modal.onclick = () => {
        document.body.removeChild($modal);
    };

    return $modal;
}
