export async function getAPI(params) {
    try {
        const response = await fetch("https://picsum.photos/v2/list?page=2&limit=100");

        if (!response.ok) {
            // HTTP 에러코드도
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);

        return result;
    } catch (error) {
        // 불러오지 못함
        console.error("There was a problem with the fetch operation:", error);
        return null;
    }
}
