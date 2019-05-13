var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
const path = require('path');

const port = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/auth',  (req,res) => {
    const url = "https://accounts.spotify.com/authorize";
    const clientId = "d0d8fc46556349d99a9667d67e9f25dc";
    const clientSecret = "3888f82c6823416c9afead5ddd051fff";
    const redirect_uri = "http://localhost:3000/";
    const scope = "user-read-private user-read-email user-top-read";
    res.redirect(url+'?'+"client_id="+clientId+'&redirect_uri='+redirect_uri+'&response_type=token'+'&scope='+scope);
    
 });


 if(process.env.NODE_ENV === "production"){
     //set static folder
     app.use(express.static('client/build'));

    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
 }
 

app.listen(port, console.log("the app is listening at port"));
