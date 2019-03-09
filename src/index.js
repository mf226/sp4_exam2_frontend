var gender = document.getElementById("gender");
var region = document.getElementById("region");
var amount = document.getElementById("amount");
var data = document.getElementById("tblbody");
var collectedData;

var url = "http://uinames.com/api/?";//?amount=5&region#&gender=female";

document.getElementById("btnsend").addEventListener("click", function () {
    fetch(getUrl()).then(res => res.json())
        .then(persons => {
            //console.log(persons);
            collectedData = persons;
            var p = persons.map((person) => {
                return '<tr>'+ '<td>' + person.name + '</td>' + '<td>' + person.surname + '</td>' + '<td>' + person.gender + '</td>' + '</tr>';
            });
            data.innerHTML = '<table>' + p.join('') + '</table>';
        }).catch(error => alert(error));

    //document.getElementById("demo").innerHTML = "Hello World";
}); 

document.getElementById("btnsql").addEventListener("click", function () {
    var SQL = createSQL();
    document.getElementById("sql").innerHTML = SQL;
}); 

function getUrl() {
    var correctUrl = url;
    if(amount.value > 0) {
        correctUrl += "amount="+amount.value + "&";
    }
    if(gender.value != "both") {
        correctUrl += "gender="+gender.value + "&";
    }
    if(region.value != "All") {
        correctUrl += "region="+region.value;
    }
    

    return correctUrl;
}

function createSQL() {
    var SQL = collectedData.map((element) => {
        return `INSERT INTO name (name,surname,gender) VALUES ('${element.name}','${element.surname}','${element.gender}');`;
    }).join("\n");

    return SQL;
}

function errorCheck(response) {
    if(response.status === 200) {
        return response.json();
    } else {
        alert(response.status);
    }
}