export default function Modal($picture, $figcap) {
    const $modal = document.createElement("div");
    $modal.id = "modal";
    $modal.classList.add("center");

    const $wrapper = document.createElement("div");
    $wrapper.classList.add("modal__content");

    const $pictureWrapper = document.createElement("div");
    $pictureWrapper.classList.add("modal__picture-wrapper", "center");

    $figcap.classList.add("modal__figcap", "center");

    $pictureWrapper.appendChild($picture);
    $wrapper.append($figcap, $pictureWrapper);
    $modal.appendChild($wrapper);

    $modal.onclick = () => {
        document.body.removeChild($modal);
    };

    return $modal;
}
