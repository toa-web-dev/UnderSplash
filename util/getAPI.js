import { URL, DEVICE_WIDTH } from "../util/config.js";
function createPagination() {
    let nextPageUrl = null; // 상태를 클로저 내에 은닉

    return {
        setNextPageUrl(url) {
            nextPageUrl = url;
        },
        getNextPageUrl() {
            return nextPageUrl;
        },
    };
}
const pagination = createPagination();
export async function getAPI(params) {
    try {
        // 요청 시작

        let response = null;
        if (pagination.getNextPageUrl() !== null) {
            response = await fetch(pagination.getNextPageUrl(), { cache: "force-cache" });
        } else {
            response = await fetch("https://picsum.photos/v2/list?page=1&limit=10", { cache: "force-cache" });
        }

        if (!response.ok) {
            // HTTP 에러코드도
            throw new Error("Network response was not ok");
        }

        // 응답 성공 후
        const linkHeader = response.headers.get("Link");
        if (linkHeader) {
            // Link 헤더 파싱
            const links = linkHeader
                .split(",") // 각 링크 분리
                .map((part) => part.match(/<([^>]+)>;\s*rel="([^"]+)"/)) // 정규식 매칭
                .reduce((acc, match) => {
                    if (match) {
                        const [, url, rel] = match; // url과 rel 값을 추출
                        acc[rel] = url;
                    }
                    return acc;
                }, new Object());

            pagination.setNextPageUrl(links.next);
        } else {
            console.log("Link 헤더가 없습니다.");
        }

        const result = await response.json();
        const data = result.map((img) => {
            for (const [device, deviceWidth] of Object.entries(DEVICE_WIDTH)) {
                const deviceHeight = Math.floor((deviceWidth * img.height) / img.width);
                img[`download_url_${device}`] = URL + `${img.id}/${deviceWidth}/${deviceHeight}`;
            }
            img.deviceWidth = { ...DEVICE_WIDTH };
            return img;
        });

        return data;
    } catch (error) {
        // 불러오지 못함
        console.error("There was a problem with the fetch operation:", error);
        return null;
    }
}
