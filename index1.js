const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html')
})

app.post('/home', function (request, response) {
    let name = request.body.Name;
    let id = request.body.id;
    let address = request.body.address;
    let CPP = parseInt(request.body.cpp);
    let JAVA = parseInt(request.body.java);
    let DBMS = parseInt(request.body.dbms);
    let CN = parseInt(request.body.cn);
    let OS = parseInt(request.body.os);
    let total_marks = CPP + JAVA + DBMS + CN + OS;

    let average = total_marks / 5

    var grade = 'A';
    if (average >= 90) {
        grade = 'A';
    } else if (average >= 80 && average < 90) {
        grade = 'B';
    } else if (average >= 70 && average < 80) {
        grade = 'C';
    } else if (average >= 55 && average < 70) {
        grade = 'D';
    } else if (average >= 40 && average < 55) {
        grade = 'E';
    } else if (average <= 40) {
        grade = 'F';
    }



    let scoreCard = {
        'Name of student': name,
        'Id': id,
        'Last name': address,
        'CPP': CPP,
        'JAVA': JAVA,
        'DBMS': DBMS,
        'CN': CN,
        'OS': OS,
        'Total Marks': total_marks,
        'Average Marks': average,
        'Grade': grade
    }

    fs.appendFileSync("data2.txt", JSON.stringify(scoreCard) + "\n\n");
    const data = fs.readFileSync("data2.txt", "utf-8")
    response.end(data);

})

app.listen(4000, () => {
    console.log("Server started at 4000.")
})