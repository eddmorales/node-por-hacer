const opciones = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de la tarea por hacer'
    },
    completado: {
        alias: 'c',
        default: true,
        desc: 'Marca como completado o pendiente la tarea'
    }
}

const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', opciones)
    .command('actualizar', 'Actualiza el estado completado de una tarea', opciones)
    .command('borrar', 'Borra una tarea en concreto', opciones)
    .command('revisar', 'Listar lista de tareas', {
        completado: {
            alias: 'c',
            default: true,
            desc: 'Marca como completado o pendiente la tarea'
        }
    })
    .help()
    .argv;


module.exports = {
    argv
}