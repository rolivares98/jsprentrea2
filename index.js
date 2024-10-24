let idActual =1;
let tareas = [];

function generarId(){
    return idActual++;
}
function agregarTarea() {
    const titulo = prompt ("Ingrese el titulo de la tarea que quiere ingresar: ");
    const descripcion = prompt("Describa la tarea ingresada: ");
    const nuevaTarea = {
        id: generarId(),
        titulo: titulo,
        descripcion: descripcion,
        estado: "pendiente"
    };
    tareas.push(nuevaTarea);
    alert("la tarea fue agregada");
}
function listarTareas(){
    if(tareas.length === 0){
        console.log("no existen tareas");
    }else{
        console.log("lista de tareas actual:");
        tareas.forEach(tarea =>{
            console.log(`ID: ${tarea.id}, Título: ${tarea.titulo}, Descripción: ${tarea.descripcion}, Estado: ${tarea.estado}`);
        });
    }
}
function actualizarEstadoTarea(){
    const id = parseInt(prompt("Ingresa el ID de la tarea que quieres actualizar: "));
    const tarea =tareas.find(t => t.id === id);
    if (tarea){
        const nuevoEstado =prompt("Ingrese el nuevo estado (pendiente, en proceso, completada)");
        tarea.estado = nuevoEstado;
        alert("estado actualizado");
    }else {
        alert("tarea no encontrada");
    }
}
function eliminarTarea() {
    const id =parseInt(prompt("ingresa el id de la tarea que quieres eliminar:"));
    const indice = tareas.findIndex(t => t.id === id);
    if (indice !== -1) {
        tareas.splice(indice, 1);
        alert("tarea eliminada");
    } else {
        alert("tarea no encontrada");
    }
}

function buscarTarea() {
    const termino =prompt("ingresa el termino de busqueda: ");
    const resultados =tareas.filter(t => t.titulo.includes(termino) || t.descripcion.includes(termino));
    if (resultados.length > 0) {
        console.log("tareas encontradas:");
        resultados.forEach(tarea =>{
            console.log(`ID: ${tarea.id}, Título: ${tarea.titulo}, Descripción: ${tarea.descripcion}, Estado: ${tarea.estado}`);
        });
    } else {
        console.log("no se encontraron tareas con el termino indicado");
    }
}

function menu() {
    let opcion;
    do{
        opcion = parseInt(prompt("Seleccione una opción:\n1. Agregar tarea\n2. Listar tareas\n3. Actualizar estado de tarea\n4. Eliminar tarea\n5. Buscar tarea\n6. Salir"));
        switch (opcion){
            case 1:
                agregarTarea();
                break;
            case 2:
                listarTareas();
                break;
            case 3:
                actualizarEstadoTarea();
                break;
            case 4:
                eliminarTarea();
                break;
            case 5:
                buscarTarea();
                break;
            case 6:
                alert("saliendo");
        }
    }while(opcion !== 6);
}
menu();