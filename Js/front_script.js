let   Y = document.getElementById('y-value');
let r_values = document.getElementsByName('r');
let x_values = document.getElementsByName('x-val');
function checkY() {
    if (isFinite(Y.value)) {
        if (Y.value > -3 && Y.value < 5) {
            return true
        } else {
            Y.setCustomValidity("Must be (-3;5)");
            //alert("");
            return false
        }
    } else {
        Y.setCustomValidity("Must be number");
        //alert("Must be number");
        return false
    }
}

const submit = function(ev) {
    if (!checkY()) return
    ev.preventDefault();

    const data = new FormData();
    let X;
    let R;
    for (let i = 0; i < x_values.length; i++) {
        if (x_values[i].checked) {
            X = x_values[i].value;
            break;
        }
    }
    let count = 0;
    for (let i = 0; i < r_values.length; i++) {
        if (r_values[i].checked) {
            R = r_values[i].value;
            count++;
        }
        if (count > 1){
            alert("Allowed only 1 R value");
            return false;
        }
    }
    data.append('x_val', X);
    data.append("y_val", Y.value);
    data.append('r_val', R);

    /*   request
           .post('Php/function.php')
           .send(data)
           .then(res => res.text())
           .then(table => document.querySelector('#res').innerML=table)
   /**/

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