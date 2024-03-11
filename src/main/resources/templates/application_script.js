const selectBtns = document.querySelectorAll(".nav-btn");

selectBtns.forEach((e) => {
    e.addEventListener("click", () => clickSelectBtns(e));
})

function clickSelectBtns(element) {
    if (!element.classList.contains("bg-select")) {
        selectBtns.forEach((f) => {
            f.classList.remove("bg-select");
        })
        element.classList.add("bg-select")
    }
}