const DatabaseUrl = "https://docs.google.com/spreadsheets/d/1YJkcSV8kYtZ2XSyfxGVsMjQnskgFsDOUqrkidNt-HRs/export?format=csv";

fetch(DatabaseUrl)
    .then(res => res.text())
    .then(data => {
        const rows = data.trim().split("\n").slice(1);

        const productos = rows.map(row => {
        const [nombre, precio, stock, imagenURL] = row.split(",");
        return {
            nombre: nombre?.trim(),
            precio: precio?.trim(),
            stock: stock?.trim(),
            imagenURL: imagenURL?.trim()
        };
        });
        mostrarProductos(productos);
    })
    .catch(err => console.error("Error cargando la base:", err));
function mostrarProductos(productos) {
    const catalogo = document.querySelector(".clothes");
    productos.forEach(p => {
        catalogo.innerHTML += `
        <div class="item">
            <img src="${p.imagenURL}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p class="bold">${p.precio}</p>
            <p>Stock: ${p.stock}</p>
        </div>
        `;
    });
}