
// document.querySelector("#x").onkeyup = validateX;

// document.querySelector("#r").onkeyup = validateR;
validateInput("request-coordinates:r",1, 4);


function validateInput(path, min, max){
    let rValue = document.getElementById(path).value;
    rValue = rValue.replace(/\,/g, ".").replace(/[^\d\.\-]/g, "");
    while (rValue.lastIndexOf('-') > 0) {
        rValue = rValue.substr(0, rValue.lastIndexOf('-'));
    }
    var r = parseFloat(rValue);
    while (r > max || r < min) {
        rValue = rValue.substr(0, rValue.length - 1);
        r = parseFloat(rValue);
    }
    while ((rValue[0] == '-' && (rValue[1] == '.' || rValue.lastIndexOf('.') > 2)) || (rValue[0] != '-' && (rValue[0] == '.' || rValue.lastIndexOf('.') > 1))) {
        rValue = rValue.substr(0, rValue.lastIndexOf('.'));
    }
    document.getElementById(path).value = rValue;
}
