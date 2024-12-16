export default function Modal($picture) {

    const $Modal = document.createElement("div")
    $Modal.classList.add("modal__top--container")

    const $pictureWrapper = document.createElement("div")
    $pictureWrapper.classList.add("modal__picture--wrapper")

    $pictureWrapper.appendChild($picture)

    $Modal.appendChild($pictureWrapper)

    $Modal.onclick = () => {
        document.body.removeChild($Modal);
    }

    return $Modal
}