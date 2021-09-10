function foo() {
  var test = {
    "origins": [
      {
        "point": {"latitude": 49.32734,"longitude": 5.92293}
      }
    ],
    "destinations": [
      {
        "point": {"latitude": 49.13243,"longitude": 7.37698}
      },
      {
        "point": {"latitude": 49.35698,"longitude": 5.98073}
      }
    ]
  };


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         JSON.parse(this.responseText)
         
         document.getElementById('response').innerText = this.responseText
       }
  };
  xhttp.open("POST", "https://api.tomtom.com/routing/1/matrix/sync/json?key=qgrvzjkhdi3EGPW4NZWirU7ibbPqqk96&routeType=fastest&travelMode=car&avoid=motorways", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(test));
}