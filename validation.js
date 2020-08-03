function checkR() {
    return true;
}
function checkY() {

}
function checkX() {

}
const submit = function(event) {
    if (!(checkR() && checkY() && checkX())) return
    event.preventDefault();
    //if (check()){
    var x_vals = document.getElementsByName('x-val');
    var x = null;
    for(let i = 0; i < x_vals.length; i++){
        if(x_vals[i].checked){
            x = x_vals[i].value;
            break;
        }
    }if (x == null){
        alert("choose x (one value)");
        // ВЫВЕСТИ ОШИБКУ
    }
    var boxes = document.getElementsByName('r-val');
    var r = null;
    for(var i = 0; i < 5; i++){
        if(boxes[i].checked){
            r = boxes[i].value;
            break;
        }
    } if (r == null){
        alert("choose r (one value)");
        // ВЫВЕСТИ ОШИБКУ
    }
    var y = document.getElementById('y-value');
    // TIME
    let time = 1;
    let scr_time = 2;
    const formData = new FormData(document.querySelector('#send_form'));
    formData.append('x_val', x);
    formData.append('y_val', y);
    formData.append('r_val', r);

    fetch('/Function.php', {
        method: 'POST',
        body: formData,
    })
        .then(res => res.text())
        .then(table => document.querySelector('#res').innerHTML=table);


    /*
               request
                   .post('/Function.php')
                   .send(data)
                   .then(res => res.text())
                   .then(table => document.querySelector('#res').innerHTML=table)
   */             //   .then(tr = "<tr>" + "\n" + "<td>" + x + "</td>" + "<td>" + y + "</td>" + "<td>" + r + "</td>" + "<td>" + res + "</td>"
               //     + "<td>" + res + "</td>" + "<td>" + scr_time + "</td>" + "<td>" + time + "</td>")
    //.then(table.innerHTML = tr); //superAgent

    //}
}
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#sendButton').addEventListener('click', onInputChanges);
});/*
let table = front.getElementById(table);
let rows = table.rows;
let tr = ""

tr = "<tr>" + "\n" + "<td>" + x + "</td>" + "<td>" + y + "</td>" + "<td>" + r + "</td>" + "<td>" + res + "</td>"
+ "<td>" + res + "</td>" + "<td>" + scr_time + "</td>" + "<td>" + time + "</td>"
front.getElementById(table).innerHTML = tr;*/
