const anoElemento = document.querySelector("#ano");
if (anoElemento) {
    anoElemento.textContent = new Date().getFullYear();
}

const historiaContainer = document.querySelector(".painel-historia");
if (historiaContainer) {
    const capitulos = Array.from(historiaContainer.querySelectorAll(".capitulo"));
    if (capitulos.length > 0) {
        let capituloAtual = 0;

        const criarBotao = (texto, id) => {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.id = id;
            botao.className = "btn btn-warning btn-rpg me-2";
            botao.textContent = texto;
            return botao;
        };

        const controles = document.createElement("div");
        controles.className = "text-center mt-4";

        const botaoAnterior = criarBotao("Capítulo Anterior", "prev-capitulo");
        const botaoProximo = criarBotao("Próximo capítulo", "next-capitulo");
        const indicador = document.createElement("span");
        indicador.id = "capitulo-indicador";
        indicador.className = "d-block mt-3 text-muted";

        controles.appendChild(botaoAnterior);
        controles.appendChild(botaoProximo);
        controles.appendChild(indicador);
        historiaContainer.appendChild(controles);

        const finalHistoria = document.querySelector(".final-historia");

        if (finalHistoria) {
            controles.insertAdjacentElement("afterend", finalHistoria);
        }

        botaoAnterior.addEventListener("click", () => {
            if (capituloAtual > 0) {
                capituloAtual -= 1;
                atualizarTela();
            }
        });

        botaoProximo.addEventListener("click", () => {
            if (capituloAtual < capitulos.length - 1) {
                capituloAtual += 1;
                atualizarTela();
            }
        });

        let typingTimer = null;
        const typeTextHtml = (element, html, speed = 25) => {
            if (!element) return;
            if (typingTimer) {
                clearTimeout(typingTimer);
                typingTimer = null;
            }

            let index = 0;
            let isTag = false;
            let content = "";

            const tick = () => {
                if (index < html.length) {
                    const char = html[index];
                    content += char;
                    element.innerHTML = content;

                    if (char === "<") {
                        isTag = true;
                    } else if (char === ">") {
                        isTag = false;
                    }

                    index += 1;
                    typingTimer = setTimeout(tick, isTag ? 0 : speed);
                }
            };

            element.innerHTML = "";
            tick();
        };

        const typeCapituloTexto = (capitulo) => {
            const paragrafo = capitulo.querySelector("p");
            if (!paragrafo) return;

            const original = paragrafo.dataset.originalHtml || paragrafo.innerHTML;
            if (!paragrafo.dataset.originalHtml) {
                paragrafo.dataset.originalHtml = original;
            }

            typeTextHtml(paragrafo, original);
        };

        const atualizarTela = () => {
            capitulos.forEach((capitulo, index) => {
                capitulo.style.display = index === capituloAtual ? "block" : "none";
            });
            botaoAnterior.disabled = capituloAtual === 0;
            botaoProximo.disabled = capituloAtual === capitulos.length - 1;
            indicador.textContent = `Capítulo ${capituloAtual + 1} de ${capitulos.length}`;
            const activo = capitulos[capituloAtual];
            if (activo) {
                typeCapituloTexto(activo);
                activo.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        atualizarTela();
    }
}
        