const navbar = `
    <nav class="bg-white h-100 rounded-4 d-flex justify-content-between align-items-start flex-column">
        <ul class="w-100 rounded-4">
            <li class="rounded-top-4">
                <a id="home" href="../Home/index.html" class="d-flex justify-content-start align-content-center p-3 w-100 rounded-top-4 pointer border-bottom border-2">
                    <img src="../../assets/icon/navbar/home-gray.svg" width="24">
                    <img class="d-none" src="../../assets/icon/navbar/home-white.svg" width="24">

                    <p class="t-gray ms-3 fs-5">Anasayfa</p>
                </a>
            </li>

            <li>
                <a id="mission" href="../Mission/index.html" class="d-flex justify-content-start align-content-center p-3 w-100 border-bottom border-2 pointer">
                    <img src="../../assets/icon/navbar/clock-gray.svg" width="24">
                    <img class="d-none" src="../../assets/icon/navbar/clock-white.svg" width="24">

                    <p class="t-gray ms-3 fs-5">Görev Seç</p>
                </a>
            </li>

            <li>
                <a id="add-mission" href="../AddMission/index.html" class="d-flex justify-content-start align-content-center p-3 w-100 border-bottom border-2 pointer">
                    <img src="../../assets/icon/navbar/add-circle-gray.svg" width="24">
                    <img class="d-none" src="../../assets/icon/navbar/add-circle-white.svg" width="24">

                    <p class="t-gray ms-3 fs-5">Görev Ekle</p>
                </a>
            </li>
        </ul> 

        <ul class="w-100">
            <li>
                <a id="settings" href="../Settings/index.html" class="d-flex justify-content-start align-content-center p-3 w-100 border-top border-2 pointer rounded-bottom-4">

                    <img src="../../assets/icon/navbar/settings-gray.svg" width="24">
                    <img class="d-none" src="../../assets/icon/navbar/settings-white.svg" width="24">

                    <p href="settings.html" class="t-gray ms-3 fs-5">Ayarlar</p>
                </a>
            </li>
        </ul>
    </nav>
`

export function addNavbar(pageId) {
    let container = document.getElementById("navbar");
    container.innerHTML = navbar;

    let a = container.querySelector(`#${pageId}`);

    a.classList.remove("gray-bg");

    if (pageId == "settings") {
        a.classList.remove("border-top");
    } else {
        a.classList.remove("border-bottom");
    }

    a.classList.add("blue-bg");

    let images = a.querySelectorAll("img");
    let p = a.querySelector("p");
       
    images[0].classList.add("d-none");
    images[1].classList.remove("d-none");

    p.classList.remove("t-gray");
    p.classList.add("text-white");
}
