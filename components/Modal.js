export default function Modal($picture, $figcap) {
    const $modal = document.createElement("div");
    $modal.id = "modal";

    const $wrapper = document.createElement("div");
    $wrapper.classList.add("modal__content");

    const $pictureWrapper = document.createElement("div");
    $pictureWrapper.classList.add("modal__picture-wrapper");

    $figcap.classList.add("modal__figcap")

    $pictureWrapper.appendChild($picture);
    $wrapper.append($figcap, $pictureWrapper );
    $modal.appendChild($wrapper);

    $modal.onclick = () => {
        document.body.removeChild($modal);
    };

    return $modal;
}
