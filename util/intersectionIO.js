export default function initIO(appendFeedItem) {
    let options = {
        root: null,
        rootMargin: "1000px 0px 0px 0px",
        threshold: 0,
    };

    return new IntersectionObserver((entries, io) => {
        if (entries[0].isIntersecting) {
            appendFeedItem();
        }
    }, options);
}
