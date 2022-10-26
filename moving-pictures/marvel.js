let count = 0;
function heroinfo() {

    var marvelPublicKey = '509766793c55d7eb72c977e1397d66f1';
    var marvelPrivateKey = '74d9d52b69a9745e9972bfcc16060a71ae190f6b';

    var name = document.getElementById('Name').value; //when button pressed ofc
    localStorage.setItem("herokey", name);

    var marvelApiStart = "https://gateway.marvel.com:443/v1/public/characters?apikey=";

    var ts = new Date().getTime();
    var hash = md5(ts + marvelPrivateKey + marvelPublicKey);
    var requestUrl = marvelApiStart + marvelPublicKey + "&ts=" + ts 
        + "&hash=" + hash + "&nameStartsWith=" + name;
    console.log(requestUrl);

    var result = fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

    var xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl);
    xhr.send();

    console.log('Loading...');
    xhr.addEventListener('load', function() {

    var data = JSON.parse(xhr.responseText);
    var resultsLength = data.data.results;

        var arr = {
        nome: resultsLength[0].name,
        description: resultsLength[0].description,
        thumbnail: resultsLength[0].thumbnail.path.extension, //image
        }

        var seriesStr = '';
        if (arr.series && arr.series.items) {
        for (var x = 0; x < arr.series.items.length; x++) {
            seriesStr += '<a href="#">' + arr.series.items[x].name + '</a>';
        }
        }

        var hn = document.querySelector('#heroname'); //heroname
        var hd = document.querySelector('#herodescription'); //herodescription

        var nome = document.createElement('span');
        var description = document.createElement('span');
        var thumbnail = document.createElement('span'); //image

        nome.innerHTML = arr.nome;
        description.innerHTML = arr.description;
        thumbnail.innerHTML = arr.thumbnail;
        
        hn.appendChild(nome);
        hd.appendChild(description);
        // hd.appendChild(thumbnail); //to add image
        count++;
        //ok will probs use film API then for the pictures
        //next steps: just implement search bar and add spaces between
        console.log(count)
        
    }
    );
}

function showDiv() {
    document.getElementById("info").style.display ="block";
}

function passvalues() {
    var name = document.getElementById('Name').value;
    localStorage.setItem("textvalue",name);
    return false;
}
