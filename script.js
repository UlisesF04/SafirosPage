const DatabaseUrl = "https://docs.google.com/spreadsheets/d/1YJkcSV8kYtZ2XSyfxGVsMjQnskgFsDOUqrkidNt-HRs/export?format=csv";
const mainUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcwAEz4LRbsJ8ewcgHadiM-9QpLjRBHXocXPNdFbUkRGeiTJHv0wOsVRe6capGzvdsi9V7TO5PP9vr/pub?gid=996489562&single=true&output=csv";
/*Create items for the catalog page*/
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
/*Change main images*/ 
if (document.querySelector(".front_main")) {

  fetch(mainUrl)
    .then(res => res.text())
    .then(data => {
      const rows = data.trim().split("\n").slice(1);
      const elementos = rows.map(row => {
        const [tipo, imagenURL] = row.split(",");
        return {
          tipo: tipo.trim(),
          imagenURL: imagenURL.trim()
        };
      });
      cargarMain(elementos);
    })
    .catch(err => console.error("Error cargando main:", err));
}
function cargarMain(elementos) {

  const frontMain = document.querySelector(".front_main");
  const track = document.querySelector(".track");
  frontMain.innerHTML = "";
  track.innerHTML = "";
  elementos.forEach(el => {
    if (el.tipo === "portada") {
      frontMain.innerHTML += `
        <img src="${el.imagenURL}" alt="Imagen portada">
      `;
    }
    if (el.tipo === "carrusel") {
      track.innerHTML += `
        <img src="${el.imagenURL}" alt="Imagen carrusel">
      `;
    }
  });
}