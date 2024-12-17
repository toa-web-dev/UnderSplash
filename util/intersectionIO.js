export default
    function initIO() {
    let options = {
        root: null,
        rootMargin: "1000px 0px 0px 0px",
        threshold: 0,
    };

    const io = new IntersectionObserver((entries, io) => {
        console.log("감지됨", io);

        console.log(entries);
        if (entries[0].isIntersecting) {
            console.log("api 불러옴");

        }

    }, options)
    return io

} 