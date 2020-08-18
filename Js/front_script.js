let   Y = document.getElementById('y-value');
let r_values = document.getElementsByName('r');
let x_values = document.getElementsByName('x-val');
let X = null;
let R;
function checkY() {
    if (Y.value.trim() === "") {
        return false
    }else {
        if (isFinite(Y.value)) {
            if (Y.value.trim() > -3 && Y.value < 5) {
                return true
            } else {
                Y.setCustomValidity("Must be (-3;5)");
                return false
            }
        } else {
            Y.setCustomValidity("Must be number");
            return false
        }
    }
}

function checkX() {
    for (let i = 0; i < x_values.length; i++) {
        if (x_values[i].checked) {
            X = x_values[i].value;
            break;
        }

    }
    if (X == null){
        //  X.setCustomValidity("Must be number");
        alert("Choose one X value");
        return false

    } else {return true}
}

function checkR() {
    let count = 0;
    for (let i = 0; i < r_values.length; i++) {
        if (r_values[i].checked) {
            R = r_values[i].value;
            count++;
        }
        if (count > 1){
            alert("Allowed only one R value");
            return false;
        }

    }
    if (count == 0){
        alert("Choose one R value");
        return false;
    } else {return true}

}


const submit = function(ev) {
    if (!(checkY())) return
    if (!(checkR())) return
    if (!(checkX())) return
    ev.preventDefault();

    const data = new FormData();

    data.append('x_val', X);
    data.append("y_val", Y.value);
    data.append('r_val', R);

    /*   request
           .post('Php/function.php')
           .send(data)
           .then(res => res.text())
           .then(table => document.querySelector('#res').innerML=table)
   */

    fetch('Php/function.php', {
        method: 'POST',
        body: data,
    })
        .then(res => res.text())
        .then(table => document.querySelector('#res').innerHTML = table);
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('sendButton').addEventListener('click', submit);
});

const clear = function(ev) {
    ev.preventDefault();

    fetch('Php/clear.php', {
        method: 'POST',
    })
        .then(res => res.text())
        .then(table => document.querySelector('#res').innerHTML = table);
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('clearButton').addEventListener('click', clear);
    $(document).animate("fadeIn");
});