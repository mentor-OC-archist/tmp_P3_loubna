let jsonList, gallery = document.querySelector('#portfolio .gallery');
(function () {
    fetch('http://localhost:5678/api/works')
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Obtenir la réponse en objet javascript JSON
        })
        .then(list => {
            jsonList = list;
            console.log(jsonList); // Utiliser les données reçues
            gallery.innerHTML = getHtmlList(jsonList);

        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
})();

function getHtmlList(list) {
    let htmlList = '';
    list.forEach(item => {
        htmlList += getHtmlItem(item);
    });
    return htmlList;
}

function filter(nbrCategory = null){
    if(nbrCategory){
    let htmlList = '';
        jsonList.forEach(item => {
            if(item.categoryId == nbrCategory) htmlList += getHtmlItem(item);
        });
        gallery.innerHTML = htmlList;
    } else {
        gallery.innerHTML = getHtmlList(jsonList); 
    }
}

function getHtmlItem(item){
    return `
    <figure>
        <img src="${item.imageUrl}" alt="${item.title}">
        <figcaption>${item.title}</figcaption>
    </figure>
    `;
}


// Attach event listeners to the list items
document.getElementById('filter-all').addEventListener('click', () => filter());
document.getElementById('filter-objects').addEventListener('click', () => filter(1));
document.getElementById('filter-apartments').addEventListener('click', () => filter(2));
document.getElementById('filter-hotels').addEventListener('click', () => filter(3));

