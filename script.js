// Função para alternar a visibilidade do menu
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
}

// Função para obter os filtros selecionados e aplicar os filtros
function applySelectedFilters() {
    const selectedTags = [];
    const selectedOutputs = [];

    // Captura os filtros de tags
    if (document.getElementById("criatividade").checked) selectedTags.push("Criatividade");
    if (document.getElementById("musica").checked) selectedTags.push("Música");
    if (document.getElementById("design").checked) selectedTags.push("Design");

    // Captura os filtros de output
    if (document.getElementById("texto").checked) selectedOutputs.push("Texto");
    if (document.getElementById("imagem").checked) selectedOutputs.push("Imagem");

    // Filtra os prompts com base nas tags e outputs selecionados
    const filteredPrompts = prompts.filter(prompt => {
        const hasSelectedTag = selectedTags.length === 0 || selectedTags.some(tag => prompt.tags.includes(tag));
        const hasSelectedOutput = selectedOutputs.length === 0 || selectedOutputs.some(output => prompt.output.includes(output));

        return hasSelectedTag && hasSelectedOutput;
    });

    // Exibe os prompts filtrados
    displayPrompts(filteredPrompts);
}

// Função para exibir os prompts filtrados
function displayPrompts(promptList) {
    const promptContainer = document.getElementById("promptContainer");
    promptContainer.innerHTML = "";

    promptList.forEach(prompt => {
        const promptDiv = document.createElement("div");
        promptDiv.classList.add("prompt");

        const promptTitle = document.createElement("div");
        promptTitle.classList.add("prompt-title");
        promptTitle.textContent = prompt.nome;

        const promptObjective = document.createElement("p");
        promptObjective.classList.add("prompt-objective");
        promptObjective.innerHTML = `<strong>Objetivo:</strong> ${prompt.objetivo}`;

        const promptOutput = document.createElement("p");
        promptOutput.innerHTML = `<strong>Output:</strong> ${prompt.output.join(", ")}`;

        const descriptionBox = document.createElement("div");
        descriptionBox.classList.add("description-box");

        const promptDescription = document.createElement("p");
        promptDescription.classList.add("prompt-description");
        promptDescription.innerHTML = prompt.descricao;

        const copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar Descrição";
        copyBtn.classList.add("copy-btn");
        copyBtn.onclick = () => copyPrompt(prompt.descricao, copyBtn);

        // Balão de feedback
        const feedback = document.createElement("span");
        feedback.classList.add("feedback");
        feedback.textContent = "Descrição copiada!";
        descriptionBox.appendChild(feedback);

        descriptionBox.appendChild(promptDescription);
        descriptionBox.appendChild(copyBtn);

        const promptExample = document.createElement("p");
        promptExample.innerHTML = `<strong>Exemplo de Input:</strong> ${prompt.exemplo}`;

        promptDiv.appendChild(promptTitle);
        promptDiv.appendChild(promptObjective);
        promptDiv.appendChild(promptOutput);
        promptDiv.appendChild(descriptionBox);
        promptDiv.appendChild(promptExample);

        promptContainer.appendChild(promptDiv);
    });
}

// Função para copiar a descrição do prompt e exibir o balão de feedback
function copyPrompt(text, button) {
    navigator.clipboard.writeText(text)
        .then(() => {
            // Exibe o balão de feedback
            const feedback = button.nextElementSibling;
            feedback.style.display = "inline-block";
            
            // Esconde o balão após 2 segundos
            setTimeout(() => {
                feedback.style.display = "none";
            }, 2000);
        })
        .catch(err => console.error("Erro ao copiar:", err));
}

// Função para carregar prompts do JSON
function loadPrompts() {
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            prompts = data;  // Atualiza a variável global `prompts` com os dados do JSON
            displayPrompts(prompts);  // Exibe os prompts ao carregar a página
        })
        .catch(error => console.error("Erro ao carregar prompts:", error));
}

// Carrega os prompts do JSON ao carregar a página
document.addEventListener("DOMContentLoaded", loadPrompts);