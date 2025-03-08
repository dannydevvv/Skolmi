const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(path.join(__dirname))); // Cargue de página form.html y form.css
app.use(express.urlencoded({extendend:true}))

// Conexión a la primera base de datos
mongoose.connect('mongodb://127.0.0.1:27017/referidos'); // Base de datos referidos
const db1 = mongoose.connection;
db1.once('open', () => {
    console.log("Conexión a la base de datos 'referidos' exitosa");
});

// Conexión a la segunda base de datos
mongoose.createConnection('mongodb://127.0.0.1:27017/usuarios') // Base de datos referidos2
    .once('open', () => {
        console.log("Conexión a la base de datos 'usuarios' exitosa");
    });

const userSchema = new mongoose.Schema({ //Paramteros del form que se van a recoger y pasar a la BD
    name: String,
    phone: String,
    email: String,
    program: String,
    code: String
})

const userSchema2 = new mongoose.Schema({ //Paramteros del form que se van a recoger y pasar a la BD
    name: String,
    code: String,
    password: String
})

// Método para comparar la contraseña
userSchema2.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

const Users = mongoose.model("data1",userSchema)
const Users2 = mongoose.model("data2",userSchema2)


app.get('/form', (req, res) => { //Se tiene que poner en el buscador => http://localhost:3019/form
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/post',async(req,res)=>{
    const {name,phone,email,program,code} = req.body
    const user = new Users({
        name,
        phone,
        email,
        program,
        code
    })
    await user.save()
    console.log(user)
    // Redirige a la misma página pero con el parámetro 'success=true'
    res.redirect('/form?success=true');
})

app.post('/user', async (req, res) => {
    const { name, password } = req.body
/*     const user2 = new Users2({
        name,
        code: codigoGenerado,
        password
    })
    await user2.save() */
    if (name == 'admin') {
        res.redirect('/pages/estados-referido.html');
    } else {
        res.redirect('/pages/usuario.html');
    }
    
})

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})