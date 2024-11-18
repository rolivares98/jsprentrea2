let idActual = JSON.parse(localStorage.getItem("ultimoId")) || 1;
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarEnStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    localStorage.setItem("ultimoId", JSON.stringify(idActual));
}

function mostrarTareas() {
    const tareasDiv = document.getElementById("tareas");
    tareasDiv.innerHTML = "<h2>Listado de tareas</h2>";
    tareas.forEach(tarea => {
        const tareaElemento = document.createElement("div");
        tareaElemento.classList.add("tarea");
        tareaElemento.innerHTML = `
            <p><strong>ID:</strong> ${tarea.id}</p>
            <p><strong>Título:</strong> ${tarea.titulo}</p>
            <p><strong>Descripción:</strong> ${tarea.descripcion}</p>
            <p><strong>Estado:</strong> ${tarea.estado}</p>
            <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
            <button onclick="actualizarEstado(${tarea.id})">Marcar completada</button>
        `;
        tareasDiv.appendChild(tareaElemento);
    });

    // Agregar eventos a los botones de eliminar
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.getAttribute("data-id"));
            confirmarEliminacion(id);
        });
    });
}

function agregarTarea(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    if (titulo === "" || descripcion === "") {
        Swal.fire({
            icon:"warning",
            title: "campos imcompletos",
            text: "por favor completa los campos"
        });
        
        return;
    }
    // verificar si hay duplicados
    const tareaDuplicada = tareas.some(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase()); 
    if (tareaDuplicada) {
        Swal.fire({
            icon: "error",
            title: "Tarea duplicada",
            text: `Ya existe una tarea con el título "${titulo}". Por favor, elige otro título.`,
        });
        return;
    }

    const nuevaTarea = {
        id: idActual++,
        titulo: titulo,
        descripcion: descripcion,
        estado: "pendiente",
    };
    tareas.push(nuevaTarea);
    guardarEnStorage();
    mostrarTareas();

    Swal.fire({
        icon: "success",
        title: "Tarea agregada",
        text: `La tarea "${titulo}" ha sido añadida correctamente.`,
    });

    document.getElementById("formTarea").reset();
}

function confirmarEliminacion(id) {
    Swal.fire({
        title: "¿Confirmar eliminación?",
        text: "No se puede deshacer esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then(result => {
        if (result.isConfirmed) {
            eliminarTarea(id); // Llamada a la función que elimina la tarea
            Swal.fire({
                icon: "success",
                title: "Eliminada",
                text: "La tarea ha sido eliminada exitosamente.",
            });
        }
    });
}

function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardarEnStorage();
    mostrarTareas();
}

function actualizarEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.estado = "completada";
        guardarEnStorage();
        mostrarTareas();

        Swal.fire({
            icon: "info",
            title: "Tarea completada",
            text: `La tarea "${tarea.titulo}" ha sido marcada como completada.`,
        });
    }
}

function ordenarTareas() {
    tareas.sort((a, b) => {
        if (a.estado === b.estado) return 0;
        return a.estado === "pendiente" ? -1 : 1;
    });
    guardarEnStorage();
    mostrarTareas();

    Swal.fire({
        icon: "success",
        title: "Tareas ordenadas",
        text: "Las tareas se han ordenado por estado.",
    });
}

function cargarTareasDesdeJSON() {
    fetch("tareas.json").then(response => {
        if(!response.ok){
            throw new Error("no se pudo cargar el archivo JSON");
        }
        return response.json();
    })
    .then(data => {
        tareas = data;
        idActual =tareas.length > 0? Math.max(...tareas.map(t => t.id)) +1 : 1;
        guardarEnStorage();
        mostrarTareas();

        Swal.fire({
            icon: "success",
            title: "Tareas cargadas",
            text: "Las tareas se han cargado correctamente desde el archivo JSON.",
        });
    })
    .catch(error => {
        console.error("Error al cargar el archivo JSON:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar las tareas desde el archivo JSON.",
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (tareas.length === 0) {
        // Si no hay tareas en localStorage se cargan desde el archivo JSON
        cargarTareasDesdeJSON();
    } else {
        mostrarTareas();
    }

    const botonOrdenar = document.getElementById("ordenarTareas");
    if (botonOrdenar) {
        botonOrdenar.addEventListener("click", ordenarTareas);
    }

    document.getElementById("formTarea").addEventListener("submit", agregarTarea);
});