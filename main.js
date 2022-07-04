var img = "";
var objetcs = [];
var model_status = "";

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(640, 420); 
    canvas.center(); 

    objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
    console.log("Modelo Carregado.");
    model_status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objetcs = results;
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (model_status != "") {
        for (index = 0; index < objetcs.length; index++) {
            document.getElementById("status").innerHTML = "Objeto Detectado.";
            fill("#FF0000");
            var percent = floor(objetcs[index].confidence * 100);
            text(objetcs[index].label + " " + percent + "%", objetcs[index].x + 15, objetcs[index].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objetcs[index].x, objetcs[index].y, objetcs[index].width, objetcs[index].height);
        }
    }
}
