function search() {
  document.getElementById('response').innerHTML = "";
  document.getElementById('spinner').hidden = false;
  document.getElementById("searchButton").disabled = true;
  const value = document.getElementById('address').value;
  const point = toCoordinate(value);
  calculate(point);
}

function toCoordinate(value) {
  const latlong = value.split(', ');
  return { "point": {"latitude": Number(latlong[0]), "longitude": Number(latlong[1])}}
}

function calculate(origin) {
  var input = {
    "origins": [
      origin
    ],
    "destinations": myDb.map(elem => ({"point": elem.point}))
  };



  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const datas = JSON.parse(this.responseText);
      const matriceWithout = datas.matrix[0];
      f(input, matriceWithout)
    }
  };
  xhttp.open("POST", "https://api.tomtom.com/routing/1/matrix/sync/json?key=qgrvzjkhdi3EGPW4NZWirU7ibbPqqk96&routeType=fastest&travelMode=car&avoid=motorways", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(input));
}

function f(input, matriceWithout) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const datas = JSON.parse(this.responseText);
      const matriceWith = datas.matrix[0];
      document.getElementById('spinner').hidden = true;
      document.getElementById("searchButton").disabled = false;
      for (let index = 0; index < matriceWith.length; index++) {
        const elementw = matriceWith[index].response.routeSummary;
        const objw = toSimpleObject(elementw);
        const element = matriceWithout[index].response.routeSummary;
        const obj = toSimpleObject(element);
        addElement(myDb[index].name, objw, obj);        
      }
    }
  };
  xhttp.open("POST", "https://api.tomtom.com/routing/1/matrix/sync/json?key=qgrvzjkhdi3EGPW4NZWirU7ibbPqqk96&routeType=fastest&travelMode=car", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(input));
}

function addElement(name, motorways, withoutMotorways) {
  const ligne = document.getElementById('response').insertRow();
  ligne.insertCell().innerHTML = name;
  ligne.insertCell().innerHTML = motorways.distance + ' Km';
  ligne.insertCell().innerHTML = motorways.duree;
  ligne.insertCell().innerHTML = withoutMotorways.distance + ' Km';
  ligne.insertCell().innerHTML = withoutMotorways.duree;
}

function toTimeString(sec) {
  let hours   = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
  let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}

function toSimpleObject(elem) {
  return {
    "distance": elem.lengthInMeters / 1000,
    "duree": toTimeString(elem.travelTimeInSeconds)
  }
}


const myDb = [
  {"name": 'Collège Longwy', "point": { "latitude": 49.53240304033028, "longitude": 5.761454952863941 }},
  {"name": 'Collège Algrange', "point": { "latitude": 49.37063420033846, "longitude": 6.058497979608342 }},
  {"name": 'Collège Audun-le-tiche', "point": { "latitude": 49.47300902268464, "longitude": 5.943999598667759 }},
  {"name": 'Collège Aumetz', "point": { "latitude": 49.42338117934902, "longitude": 5.948562037282614 }},
  {"name": 'Collège Cattenom', "point": { "latitude": 49.405424472967034, "longitude": 6.242247612156673 }},
  {"name": 'Collège Fameck', "point": { "latitude": 49.3019421801208, "longitude": 6.116346085173204 }},
  {"name": 'Collège Florange', "point": { "latitude": 49.32084120615519, "longitude": 6.128552769827645 }},
  {"name": 'Collège Fontoy', "point": { "latitude": 49.355946191030974, "longitude": 5.986074840991983 }},
  {"name": 'Collège Guénange', "point": { "latitude": 49.300624898507785, "longitude": 6.200218544701646 }},
  {"name": 'Collège Hayange - Hurlevent', "point": { "latitude": 49.31396681371229, "longitude": 6.057909885173503 }},
  {"name": 'Collège Hettange-grande', "point": { "latitude": 49.402407952524996, "longitude": 6.1635981563390265 }},
  {"name": 'Collège Kédange-sur-canner', "point": { "latitude": 49.31619932771513, "longitude": 6.32999000102168 }},
  {"name": 'Collège Knutange', "point": { "latitude": 49.35605990275358, "longitude": 6.068184898664974 }},
  {"name": 'Collège Lexy', "point": { "latitude": 49.49709527036963, "longitude": 5.730292666120841 }},
  {"name": 'Collège Longlaville', "point": { "latitude": 49.527154059602005, "longitude": 5.796854198669005 }},
  {"name": 'Collège Longuyon', "point": { "latitude": 49.4355841113046, "longitude": 5.614373806590956 }},
  {"name": 'Collège Montsaint-martin', "point": { "latitude": 49.5447283335685, "longitude": 5.79013048517891 }},
  {"name": 'Collège Réhon', "point": { "latitude": 49.49202879386638, "longitude": 5.752097357562622 }},
  {"name": 'Collège Sierck-les-bains', "point": { "latitude": 49.43814639623969, "longitude": 6.3556451275034185 }},
  {"name": 'Collège Thionville', "point": { "latitude": 49.35987439158943, "longitude": 6.147819998665103 }},
  {"name": 'Collège Uckange', "point": { "latitude": 49.30387374502194, "longitude": 6.145864540990721 }},
  {"name": 'Collège Villerupt', "point": { "latitude": 49.46098336574971, "longitude": 5.925411383321435 }},
  {"name": 'Collège Yutz', "point": { "latitude": 49.354286810303236, "longitude": 6.199102690740911 }}
]