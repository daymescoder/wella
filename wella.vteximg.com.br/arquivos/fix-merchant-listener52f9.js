function verificarProduct() {
    // Seleciona todos os scripts de tipo "application/ld+json"
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');

    // Itera sobre os scripts encontrados
    scripts.forEach(scriptElement => {
        try {
            // Analisa o conteúdo do script como JSON
            const jsonData = JSON.parse(scriptElement.textContent);

            // Verifica se o JSON possui o @context e @type desejados
            if (jsonData["@context"] === "https://schema.org/" && jsonData["@type"] === "Product") {
                // Faça o que for necessário com o JSON
                console.log(jsonData);

                // Seletor para encontrar a tag meta com itemprop="image"
                const metaImageTag = document.querySelector('meta[itemprop="image"]');

                // Verifica se a tag meta foi encontrada
                if (metaImageTag) {
                    // Obtém a URL da tag meta
                    const imageUrl = metaImageTag.getAttribute('content');
            
                    // Adiciona a propriedade "image" ao JSON com a URL obtida
                    jsonData.image = imageUrl;
            
                    // Atualiza o conteúdo do script com o JSON modificado
                    scriptElement.textContent = JSON.stringify(jsonData, null, 2);
            
                    // Agora, o DOM foi atualizado com a nova propriedade "image"
                    console.log(jsonData);
                } else {
                    console.log("Tag meta com itemprop='image' não encontrada.");
                }

                clearInterval(intervalID);
            }
        } catch (error) {
            console.error("Erro ao analisar o JSON:", error);
        }
        }
    );

}

// Define um intervalo para chamar a função a cada 1000 milissegundos (1 segundo)
const intervalID = setInterval(verificarProduct, 500);