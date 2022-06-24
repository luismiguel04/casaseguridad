const mongoose = require('mongoose')
//requerimos el env para variables de abmiente
require("dotenv").config()
//declaro la constante igualandola a la url en archivo env
const DBURLCONECT = process.env.DBURLCONECT

module.exports = () => {
    const connect = () => {
        mongoose.connect(DBURLCONECT,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                keepAlive: true

            }, (err) => {
                if (err) {
                    console.log('DB:ERROR !!');
                    console.log(err);
                } else {
                    console.log('Conexion correcta a mongo!!')
                }
            })

    }
    connect();
}
/* mongodb + srv://luismiguel:<password>@luiscluster.luacv.mongodb.net/?retryWrites=true&w=majority */