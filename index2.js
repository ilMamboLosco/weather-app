import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const link = "https://api.openweathermap.org";
var position;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

function coordinate(req, res, next){
    position = req.body["ricerca"];
    next();
}

app.use(coordinate);

app.get("/", async (req, res) =>{
    try{
        const meteo = await axios.get(link);
        res.render("index.ejs", {});
    }catch(error){
    console.log(error.response);
    res.status(500);
}
});


app.post("/giorni", async (req, res) => {
    try{
        let posizione = await axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + position +"&appid=appidKey");
        const latitude = posizione.data[0].lat;
        const longitude = posizione.data[0].lon;
        let temperatura00 = await axios.get(`https://api.meteomatics.com/2024-02-14T00:00:00Z--2024-02-17T00:00:00Z:PT1H/t_2m:C/` + latitude + "," + longitude + "/json",
        {
          auth: {
            username: 'username',
            password: 'password',
          }});
        
        let temperatura = temperatura00.data.data[0].coordinates[0].dates[0].value;
        res.render("index.ejs", {temperatura: temperatura});
    }catch(error){
        console.log(error.response);
        res.status(500);
    }
});//


app.listen(port,() => {
    console.log("Server running on port " + port);
});
