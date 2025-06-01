const productDescriptionDiv = document.querySelector('div.productDescription > div > .productDescription');
const paragraphs = productDescriptionDiv.innerHTML.split('<br>').map(text => {
    if (!text.includes('<p>') && text.trim() !== '') {
        return '<p>' + text.trim() + '</p>';
    }
    return text;
}).join('');

// Remover parágrafos vazios (tags <p></p> sem conteúdo)
const cleanedParagraphs = paragraphs.replace(/<p><\/p>/g, '');
productDescriptionDiv.innerHTML = cleanedParagraphs;
productDescriptionDiv.classList.add("sub-title-text","d-block","text-center","mb-2");

window.formatTexts = () => {
    return console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
} 

