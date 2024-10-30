// Função para alternar a visibilidade do menu
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
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
        copyBtn.onclick = () => copyPrompt(prompt.descricao);

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

// Função para copiar a descrição do prompt
function copyPrompt(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert("Descrição copiada!"))
        .catch(err => console.error("Erro ao copiar:", err));
}

// Dados de exemplo (substitua pelo carregamento do JSON ou API)
const prompts = [
    {
        "id": 1,
        "nome": "Letra de Música Personalizada",
        "descricao": "Crie uma letra de música para o tema: {tema}. Gênero: {gênero musical}. Sentimentos: {sentimentos que deseja transmitir}.",
        "objetivo": "Desenvolver habilidades de escrita musical.",
        "output": ["Texto"],
        "exemplo": "Tema: Amizade, Gênero: Pop, Sentimentos: Felicidade e Nostalgia",
        "tags": ["Criatividade", "Música", "Escrita"]
    },
    {
        "id": 2,
        "nome": "Design de Capa para Música",
        "descricao": "Crie uma capa de música no estilo: {estilo}. Descrição detalhada: {descrição}, Tamanho: {tamanho}.",
        "objetivo": "Criar uma arte visual que represente a música.",
        "output": ["Imagem", "Texto"],
        "exemplo": "Estilo: Vintage, Descrição: Uma capa que remete aos anos 80, Tamanho: 3000x3000 pixels",
        "tags": ["Criatividade", "Música", "Design"]
    }
];

// Carregar os prompts ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    displayPrompts(prompts);
});
