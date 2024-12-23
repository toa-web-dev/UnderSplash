export default function initIO($lastTargetPicture, callback) {
    const option = {
        root: $lastTargetPicture,
        rootMargin: "100% 0px 0px 0px",
        threshold: 0,
    };
    return new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            callback();
        }
    }, option);
}
