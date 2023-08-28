const log = (logs) => console.log(logs);

const LINK = `https://64ec7004f9b2b70f2bfa53e4.mockapi.io`

const main = document.getElementById(`main`);

const getData = async (endPoint) => {
    try {
        const response = await fetch(LINK + endPoint);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }

}

const buildMain = async () => {
    const data = await getData(`/items`);
    log(data);
}

buildMain();

