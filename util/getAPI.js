const URL = "https://picsum.photos/id/";
const DEVICE_WIDTH = {
    laptop: 1440,
    tablet: 768,
    mobile: 425,
};

export async function getAPI(params) {
    try {
        const response = await fetch("https://picsum.photos/v2/list?page=6&limit=30", { cache: "force-cache" });

        if (!response.ok) {
            // HTTP 에러코드도
            throw new Error("Network response was not ok");
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
