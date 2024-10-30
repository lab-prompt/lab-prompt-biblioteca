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

// Função de copiar
function copyPrompt(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert("Descrição copiada!"))
        .catch(err => console.error("Erro ao copiar:", err));
}
