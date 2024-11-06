let idActual =JSON.parse(localStorage.getItem("ultimoId")) || 1;
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarEnStorage(){
    localStorage.setItem("tareas", JSON.stringify(tareas));
    localStorage.setItem("ultimoId", JSON.stringify(idActual));
}

function agregarTarea() {
    const titulo = prompt ("Ingrese el titulo de la tarea que quiere ingresar: ");
    const descripcion = prompt("Describa la tarea ingresada: ");
    const nuevaTarea = {
        id: idActual++,
        titulo: titulo,
        descripcion: descripcion,
        estado: "pendiente"
    };
    tareas.push(nuevaTarea);
    guardarEnStorage();
    mostrarTareas();
}

function mostrarTareas() {
    const tareasDiv = document.getElementById("tareas");
    tareasDiv.innerHTML = "";
    tareas.forEach(tarea => {
        const tareaElemento = document.createElement("div");
        tareaElemento.classList.add("tarea");
        tareaElemento.innerHTML = `
            <p><strong>ID:</strong> ${tarea.id}</p>
            <p><strong>Título:</strong> ${tarea.titulo}</p>
            <p><strong>Descripción:</strong> ${tarea.descripcion}</p>
            <p><strong>Estado:</strong> ${tarea.estado}</p>
            <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            <button onclick="actualizarEstado(${tarea.id})">Marcar completada</button>
        `;
        tareasDiv.appendChild(tareaElemento);
    });
}
function actualizarEstado(id){
    const tarea =tareas.find(t => t.id === id);
    if (tarea) {
        tarea.estado = "completada";
        guardarEnStorage();
        mostrarTareas();
    }
}

function eliminarTarea(id){
    tareas =tareas.filter(t => t.id !== id);
    guardarEnStorage();
    mostrarTareas();
}
document.addEventListener("DOMContentLoaded", mostrarTareas);