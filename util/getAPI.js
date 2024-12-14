const URL = "https://picsum.photos/id/";
const SRCSET_MAXWIDTH = { tablet: 768, mobile: 425 };

export async function getAPI(params) {
    try {
        const response = await fetch("https://picsum.photos/v2/list?page=9&limit=15", { cache: "force-cache" });

        if (!response.ok) {
            // HTTP 에러코드도
            throw new Error("Network response was not ok");
        }

        const result = await response.json();

        const data = result.map((el) => {
            const tabletWidth = SRCSET_MAXWIDTH.tablet;
            const tabletHeight = Math.floor((tabletWidth * el.height) / el.width);
            el.download_url_tablet = URL + `${el.id}/${tabletWidth}/${tabletHeight}`;

            const mobileWidth = SRCSET_MAXWIDTH.mobile;
            const mobileHeight = Math.floor((mobileWidth * el.height) / el.width);
            el.download_url_mobile = `${URL}${el.id}/${mobileWidth}/${mobileHeight}`;

            el.width = { desktop: el.width, tablet: SRCSET_MAXWIDTH.tablet, mobile: SRCSET_MAXWIDTH.mobile };
            return el;
        });

        return data;
    } catch (error) {
        // 불러오지 못함
        console.error("There was a problem with the fetch operation:", error);
        return null;
    }
}
