const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) throw Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
        return listadoPorHacer;
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = descripcion => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();
    return porHacer;
}

const getListado = () => {
    return cargarDB();
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }

    return false;
}

const borrar = (descripcion) => {
    cargarDB();
    let listadoNuevo = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoNuevo.length !== listadoPorHacer.length) {
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
        let borrado = listadoPorHacer[index];

        listadoPorHacer = listadoNuevo;
        guardarDB();

        return borrado;
    }
    return null;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}