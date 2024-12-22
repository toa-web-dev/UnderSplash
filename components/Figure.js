// 클래스로 원하는 컴포넌트만 export 할 수 있게 ({{ $figure?: HTMLElement, $picture?: HTMLElement, $figcap?: HTMLElement }}) 유지보수 해볼 것

/**
 * @description $figure $picture $figcap을 자유롭게 조합 할 수 있도록 세 요소를 각자 export합니다.
 * @param {JSON} data
 * @returns  {{ $figure: HTMLElement, $picture: HTMLElement, $figcap: HTMLElement }}
 */

export default function Figure(data) {
    const $figure = document.createElement("figure");
    const $picture = document.createElement("picture");
    const $figcap = document.createElement("figcaption");

    $figure.style.aspectRatio = data.width / data.height;
    $figcap.innerHTML = `<b>${data.author}</b>`;

    $figure.classList.add("skeleton");
    $figure.id = data.id
    $figure.innerText = data.id
    
    $picture.classList.add("hidden", "picture");

    init$picture(data, $picture);

    function init$picture(data) {
        function createSource(srcset, media) {
            const $source = document.createElement("source");
            $source.srcset = srcset;
            $source.media = media;
            return $source;
        }

        //source 태그 생성
        const $sourceDesktop = createSource(
            data.download_url,
            `(min-width: ${parseInt(data.deviceWidth.tablet) + 1}px)`
        );
        const $sourceLaptop = createSource(
            data.download_url_laptop,
            `(max-width: ${data.deviceWidth.laptop}px) and (min-width:${parseInt(data.deviceWidth.tablet) + 1}px)`
        );
        const $sourceTablet = createSource(
            data.download_url_tablet,
            `(max-width: ${data.deviceWidth.tablet}px) and (min-width:${parseInt(data.deviceWidth.mobile) + 1}px)`
        );
        const $sourceMobile = createSource(data.download_url_mobile, `(max-width: ${data.deviceWidth.mobile}px)`);

        //img 태그 생성
        const $img = document.createElement("img");
        $img.src = data.download_url_mobile;
        $img.alt = "이미지 설명";
        $img.addEventListener("load", () => {
            $picture.classList.remove("hidden");
            $figure.classList.remove("skeleton");
        });

        //picture 태그에 source와 img 추가
        $picture.append($sourceDesktop,$sourceLaptop, $sourceTablet, $sourceMobile, $img);
    }

    return { $figure, $picture, $figcap };
}
