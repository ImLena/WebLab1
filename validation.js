let table = front.getElementById(table);
let rows = table.rows;
let tr = ""

tr = "<tr>" + "\n" + "<td>" + x + "</td>" + "<td>" + y + "</td>" + "<td>" + r + "</td>" + "<td>" + res + "</td>"
+ "<td>" + res + "</td>" + "<td>" + scr_time + "</td>" + "<td>" + time + "</td>"
front.getElementById(table).innerHTML = tr;