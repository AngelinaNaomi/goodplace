function initMap() {
  // initialize services
  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();
  // build request
  const origin1 = { lat: 55.93, lng: -3.118 };
  const origin2 = "Greenwich, England";
  const destinationA = "Stockholm, Sweden";
  const destinationB = { lat: 50.087, lng: 14.421 };
  const request = {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };
  // // put request on page
  // document.getElementById("request").innerText = JSON.stringify(
  //   request,
  //   null,
  //   2
  // );
  // get distance matrix response
  service.getDistanceMatrix(request).then((response) => {
    // put response
    document.getElementById("response").innerText = JSON.stringify(
      response,
      null,
      2
    );
  });
}