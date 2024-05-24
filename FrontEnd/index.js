(function () {
    fetch('http://localhost:5678/api/works')
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Transformer la réponse en JSON
        })
        .then(list => {
            console.log(list); // Utiliser les données reçues
            document.querySelector('#portfolio .gallery').innerHTML = getHtmlList(list);

        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
})();

function getHtmlList(list) {
    let innerHtml = '';
    list.forEach(item => {
        innerHtml += `
        <figure>
            <img src="${item.imageUrl}" alt="${item.title}">
            <figcaption>${item.title}</figcaption>
        </figure>
        `
    });
    return innerHtml;
}