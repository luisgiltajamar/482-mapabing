(function () {
    "use strict";
    var map;

    function cargarMapa(position) {
        Microsoft.Maps.loadModule('Microsoft.Maps.Map',
            { callback: function() {

                var opc = {
                    credentials: "credencial",
                    center: new Microsoft.Maps.Location(
                        position.latitude, position.longitude),
                    zoom: 8
                };

                map = new Microsoft.Maps.Map(
                    document.getElementById("mapa"), opc);

            }, culture: 'es-es' });


    }

    function fijarPosicion(position) {
        map.setView({
            center: new Microsoft.Maps.Location(position.latitude,
                position.longitude)
        });
    }

    function eventoPosicion(pos) {
        if (!pos.coordinate)
            pos = pos.position;

        if (!map)
            cargarMapa(pos.coordinate);
        else
            fijarPosicion(pos.coordinate);
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var loc = new Windows.Devices.Geolocation.Geolocator();

            loc.getGeopositionAsync().then(function (pos) {
                eventoPosicion(pos);

            });

            loc.addEventListener("positionchanged", eventoPosicion);
        }
    });
})();
