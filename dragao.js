const anoElemento = document.querySelector("#ano");
if (anoElemento) {
    anoElemento.textContent = new Date().getFullYear();
}