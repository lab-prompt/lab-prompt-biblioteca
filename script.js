// Carrega os dados do arquivo JSON
async function loadPrompts() {
    try {
        const response = await fetch('prompts.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao carregar prompts:", error);
    }
}

// Exibe a categoria selecionada
async function showCategory(category) {
    const data = await loadPrompts();
    const promptContainer = document.getElementById("promptContainer");
    promptContainer.innerHTML = ""; // Limpa os prompts anteriores

    if (data && data[category]) {
        data[category].forEach(prompt => {
            const promptDiv = document.createElement("div");
            promptDiv.classList.add("prompt");

            const promptTitle = document.createElement("h3");
            promptTitle.textContent = prompt.nome;

            // Destaca a descrição como uma citação
            const promptDescription = document.createElement("blockquote");
            promptDescription.classList.add("prompt-description");
            promptDescription.textContent = prompt.descricao;

            const promptInput = document.createElement("p");
            promptInput.innerHTML = `<strong>Input:</strong> ${prompt.input}`;

            const promptOutput = document.createElement("p");
            promptOutput.innerHTML = `<strong>Output:</strong> ${prompt.output}`;

            const promptObjective = document.createElement("p");
            promptObjective.innerHTML = `<strong>Objetivo:</strong> ${prompt.objetivo}`;

            // Botão de copiar apenas a descrição
            const copyBtn = document.createElement("button");
            copyBtn.textContent = "Copiar Descrição";
            copyBtn.classList.add("copy-btn");
            copyBtn.onclick = () => copyPrompt(prompt.descricao);

            promptDiv.appendChild(promptTitle);
            promptDiv.appendChild(promptObjective);
            promptDiv.appendChild(promptDescription);
            promptDiv.appendChild(promptInput);
            promptDiv.appendChild(promptOutput);
            promptDiv.appendChild(copyBtn);

            promptContainer.appendChild(promptDiv);
        });
    } else {
        promptContainer.innerHTML = "<p>Nenhum prompt encontrado para esta categoria.</p>";
    }
}

// Função para copiar o texto da descrição
function copyPrompt(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert("Descrição copiada!"))
        .catch(err => console.error("Erro ao copiar:", err));
}

// Exibe a primeira categoria por padrão
document.addEventListener("DOMContentLoaded", () => {
    showCategory("criatividade");
});
