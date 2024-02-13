import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const link = "https://api.openweathermap.org";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get("/", async (req, res) =>{
    try{
        const meteo = await axios.get(link);
        res.render("index.ejs", {});
    }catch(error){
    console.log(error.response);
    res.status(500);
}
});


app.get("/meteo", async (req, res) => {
    console.log(req.body);
    try{
        var position = req.body.city;
        console.log(position);
        /*let posizione = await axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + position +"&appid=e9e3fde18fec6993c9f538cdd5c067c6");
        const latitude = posizione.data[0].lat;
        const longitude = posizione.data[0].lon;
    
        console.log(`City: ${position}, Latitude: ${latitude}, Longitude: ${longitude}`);
        
        res.json({ latitude, longitude });*/
    }catch(error){
        console.log(error.response);
        res.status(500);
    }
});//

app.listen(port,() => {
    console.log("Server running on port " + port);
});
