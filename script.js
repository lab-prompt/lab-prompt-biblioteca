const prompts = [
    {
        "id": 1,
        "nome": "Letra de Música Personalizada",
        "descricao": "Crie uma letra de música para o tema: {tema}. Inclua o gênero musical: {gênero} e os sentimentos que deseja transmitir: {sentimentos}.",
        "objetivo": "Desenvolver habilidades de escrita musical.",
        "input": "Tema: {tema}, Gênero: {gênero}, Sentimentos: {sentimentos}",
        "output": "Texto",
        "tags": ["Criatividade", "Música", "Escrita"]
    },
    {
        "id": 2,
        "nome": "Design de Capa para Música",
        "descricao": "Crie uma capa de música no estilo: {estilo}. Descrição detalhada: {descrição}, Tamanho: {tamanho}",
        "objetivo": "Criar uma arte visual que represente a música.",
        "input": "Estilo: {estilo}, Descrição: {descrição}, Tamanho: {tamanho}",
        "output": "Imagem",
        "tags": ["Criatividade", "Música", "Design"]
    }
];

// Filtros de tags e output
let selectedTags = new Set();
let selectedOutputs = new Set();

function filterByTag(tag) {
    selectedTags.has(tag) ? selectedTags.delete(tag) : selectedTags.add(tag);
    applyFilters();
}

function filterByOutput(output) {
    selectedOutputs.has(output) ? selectedOutputs.delete(output) : selectedOutputs.add(output);
    applyFilters();
}

function applyFilters() {
    const filteredPrompts = prompts.filter(prompt => {
        const hasTag = Array.from(selectedTags).every(tag => prompt.tags.includes(tag));
        const hasOutput = selectedOutputs.size === 0 || selectedOutputs.has(prompt.output);
        return hasTag && hasOutput;
    });
    displayPrompts(filteredPrompts);
}

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

        const descriptionBox = document.createElement("div");
        descriptionBox.classList.add("description-box");

        const promptDescription = document.createElement("p");
        promptDescription.classList.add("prompt-description");
        promptDescription.innerHTML = prompt.descricao;

        const copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar Descrição";
        copyBtn.classList.add("copy-btn");
        copyBtn.onclick = () => copyPrompt(prompt.descricao);

        descriptionBox.appendChild(promptDescription);
        descriptionBox.appendChild(copyBtn);

        const promptInput = document.createElement("p");
        promptInput.innerHTML = `<strong>Input:</strong> ${prompt.input}`;

        promptDiv.appendChild(promptTitle);
        promptDiv.appendChild(promptObjective);
        promptDiv.appendChild(descriptionBox);
        promptDiv.appendChild(promptInput);

        promptContainer.appendChild(promptDiv);
    });
}

function copyPrompt(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert("Descrição copiada!"))
        .catch(err => console.error("Erro ao copiar:", err));
}

document.addEventListener("DOMContentLoaded", () => {
    displayPrompts(prompts);
});
