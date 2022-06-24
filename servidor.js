const { application } = require('express');
const express = require('express');
const servidor = express();

//importar rutas de usuarios
const userroutes = require('./src/routes/user');

//middleware




const conexion = require('./conexionabd');
//const sensores = require('./sensores');

//coneccion a mongo
const CONEMONGO = require('./mongoconection/mongoconect')

servidor.listen(5000);
CONEMONGO()

// entrega la coleccion de usuarios
servidor.get('/usuarios', (req, res) => {
    conexion.query('select * from usuarios', (error, reslults) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(reslults);
        }

    })
});

servidor.get('/sensores', (req, res) => {
    conexion.query('select * from sensores', (error, reslults) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(reslults);
        }

    })
});

servidor.get('/bitacora', (req, res) => {
    conexion.query('select * from bitacora', (error, reslults) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(reslults);
        }

    })
});



//entrega un recurso en especifico mediante el id
servidor.get('/usuarios/:id', (req, res) => {

    const idusuario = req.params.id;

    function isEmptyObject(obj) {
        return JSON.stringify(obj) === '[]';
    }

    conexion.query('select * from usuarios where id=' + idusuario, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (isEmptyObject(result) === true) {
                console.log(isEmptyObject(result));
                res.status(404).json({ "mensaje": "id no existe en la base de datos" });

            } else {
                res.status(200).send(result);

            }

        }

    })

});

servidor.post('/usuarios/', express.json({ type: '*/*' }), (req, res) => {



    var Nombre = req.body.Nombre;
    var Usuario = req.body.Usuario;
    var Contrasena = req.body.Contrasena;

    const consulta = '"' + Nombre + '","' + Usuario + '","' + Contrasena + '")';





    conexion.query('insert into usuarios(Nombre, Usuario,Contrasena) values (' + consulta, (error, reslults) => {
        if (error) {
            console.error(error);
            console.error(consulta);

        } else {
            console.log("1 USUARIO insertado");
            console.log(reslults);
            console.log(conexion.query);

        }

        res.status(201).json({ "mensaje": "se agrego un nuevo recurso a la coleccion usuarios" });
        res.end();


    });

});


//BORRAR UN RECURSO
servidor.delete('/usuarios/:id', (req, res) => {

    idusuario = req.params.id;

    function isEmptyObject(obj) {
        return JSON.stringify(obj) === '[]';
    }

    conexion.query('select * from usuarios where id=' + idusuario, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (isEmptyObject(result) === true) {
                console.log(isEmptyObject(result));
                res.status(404).json({ "mensaje": "id no existe en la base de datos" });

            } else {
                conexion.query('delete from usuarios where id =' + idusuario, (error, result) => {


                    if (error) {
                        console.error(error);
                        return
                    }
                    console.log("usuario eliminado");
                    console.log("Number of records deleted: " + result.affectedRows);
                    res.status(200).json({ "mensaje": "se elimino un recurso a la coleccion usuarios con el id: " + idusuario });

                    res.end();
                });

            }

        }

    })

    // entrega la colección de sensores
    servidor.get('/sensores', (req, res) => {
        conexion.query('select * from sensores', (error, reslults) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).send(reslults);
            }

        })
    });

    //entrega un recurso en especifico mediante el id


});

servidor.get('/sensores/:id', (req, res) => {

    const idsensor = req.params.id;

    function isEmptyObject(obj) {
        return JSON.stringify(obj) === '[]';
    }

    conexion.query('select * from sensores where id=' + idsensor, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (isEmptyObject(result) === true) {
                console.log(isEmptyObject(result));
                res.status(404).json({ "mensaje": "id no existe en la base de datos" });

            } else {
                res.status(200).send(result);

            }

        }

    })

});

servidor.get('/bicacora/:id', (req, res) => {

    const idbitacora = req.params.id;

    function isEmptyObject(obj) {
        return JSON.stringify(obj) === '[]';
    }

    conexion.query('select * from bitacora where id=' + idbitacora, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (isEmptyObject(result) === true) {
                console.log(isEmptyObject(result));
                res.status(404).json({ "mensaje": "id no existe en la base de datos" });

            } else {
                res.status(200).send(result);

            }

        }

    })

});

servidor.post('/sensores/', express.json({ type: '*/*' }), (req, res) => {



    var Numser = req.body.Numser;
    var Lugar = req.body.Lugar;
    var Modelo = req.body.Modelo;
    var Capacidad = req.body.Capacidad;

    const consulta = '"' + Numser + '","' + Lugar + '","' + Modelo + '","' + Capacidad + '")';





    conexion.query('insert into sensores(Numser,Lugar,Modelo,Capacidad) values (' + consulta, (error, reslults) => {
        if (error) {
            console.error(error);
            console.error(consulta);

        } else {
            console.log("1 sensor insertado");
            console.log(reslults);
            console.log(conexion.query);

        }

        res.status(201).json({ "mensaje": "se agrego un nuevo recurso a la coleccion sensores" });
        res.end();


    });

});


//BORRAR UN RECURSO
servidor.delete('/sensores/:id', (req, res) => {

    idsensor = req.params.id;

    function isEmptyObject(obj) {
        return JSON.stringify(obj) === '[]';
    }

    conexion.query('select * from sensores where id=' + idusuario, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (isEmptyObject(result) === true) {
                console.log(isEmptyObject(result));
                res.status(404).json({ "mensaje": "id no existe en la base de datos" });

            } else {
                conexion.query('delete from sensores where id =' + idsensor, (error, result) => {


                    if (error) {
                        console.error(error);
                        return
                    }
                    console.log("sensor eliminado");
                    console.log("Number of records deleted: " + result.affectedRows);
                    res.status(200).json({ "mensaje": "se elimino un recurso a la coleccion sensor con el id: " + idsensor });

                    res.end();
                });

            }

        }

    })


});
