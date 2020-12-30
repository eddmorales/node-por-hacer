const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFileSync('db/data.json', data, (err) => {
        if (err)
            rejects(err);
        else
            resolve(`nuevatarea.txt`);
    });
}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

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
    cargarDB();

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return 'Tarea completada';
    } else {
        return 'No se pudo actualizar la tarea';
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

const revisarTareas = (completado) => {
    cargarDB();
    let palabra;
    if (completado == 'true') {
        palabra = true;
    } else {
        palabra = false;
    }

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === palabra);

    if (nuevoListado.length > 0) {
        return nuevoListado;
    } else {
        return null;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    revisarTareas
}