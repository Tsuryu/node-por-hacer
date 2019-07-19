const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'descripcion de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'marca como completado o pendiente la tarea'
}

const argv = require('yargs')
    .command('crear', 'crear un elemento por hacer', { descripcion })
    .command('borrar', 'borrar un elemento por hacer', { descripcion })
    .command('actualizar', 'actualiza el estado completado de una tarea', { descripcion, completado })
    .help()
    .argv;

module.exports = {
    argv
}