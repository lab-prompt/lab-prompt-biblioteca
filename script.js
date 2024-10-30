function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
}

async function loadPrompts() {
    try {
        const response = await fetch('prompts.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao carregar prompts:", error);
    }
}

async function showCategory(category) {
    const data = await loadPrompts();
    const promptContainer = document.getElementById("promptContainer");
    promptContainer.innerHTML = "";

    if (data && data[category]) {
        data[category].forEach(prompt => {
            const promptDiv = document.createElement("div");
            promptDiv.classList.add("prompt");

            const promptTitle = document.createElement("div");
            promptTitle.classList.add("prompt-title");
            promptTitle.textContent = prompt.nome;

            const promptObjective = document.createElement("p");
            promptObjective.classList.add("prompt-objective");
            promptObjective.innerHTML = `<strong>Objetivo:</strong> ${prompt.objetivo}`;

            const promptInput = document.createElement("p");
            promptInput.innerHTML = `<strong>Input:</strong> ${prompt.input}`;

            const promptOutput = document.createElement("p");
            promptOutput.innerHTML = `<strong>Output:</strong> ${prompt.output}`;

            const descriptionBox = document.createElement("div");
            descriptionBox.classList.add("description-box");

            const promptDescription = document.createElement("p");
            promptDescription.classList.add("prompt-description");
            promptDescription.textContent = prompt.descricao;

            const copyBtn = document.createElement("button");
            copyBtn.textContent = "Copiar Descrição";
            copyBtn.classList.add("copy-btn");
            copyBtn.onclick = () => copyPrompt(prompt.descricao);

            descriptionBox.appendChild(promptDescription);
            descriptionBox.appendChild(copyBtn);

            promptDiv.appendChild(promptTitle);
            promptDiv.appendChild(promptObjective);
            promptDiv.appendChild(promptInput);
            promptDiv.appendChild(promptOutput);
            promptDiv.appendChild(descriptionBox);

            promptContainer.appendChild(promptDiv);
        });
    } else {
        promptContainer.innerHTML = "<p>Nenhum prompt encontrado para esta categoria.</p>";
    }
}

function copyPrompt(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            // Criar o balão de feedback
            const feedback = document.createElement("div");
            feedback.classList.add("feedback");
            feedback.textContent = "Descrição copiada!";

            // Adicionar o balão ao botão e exibi-lo
            const button = event.target;
            button.parentElement.appendChild(feedback);
            feedback.style.display = "block";

            // Remover o balão após 2 segundos
            setTimeout(() => {
                feedback.style.display = "none";
                feedback.remove();
            }, 2000);
        })
        .catch(err => console.error("Erro ao copiar:", err));
}
