// Google maps function
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(30.334455,-97.716170),
        zoom:18,
};

var map=new google.maps.Map(document.getElementById("mapLocation"),mapProp);
}