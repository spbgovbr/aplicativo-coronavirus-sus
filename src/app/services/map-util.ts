import * as L from 'leaflet';
export class MapUtil {

  public static  options = {
    layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 1,
        maxZoom: 17
      })
  };

  public static iconPinClose = L.icon({
    iconUrl: 'assets/images/mapa/mapmark-cinza.svg',
    iconSize: [40, 60],
    popupAnchor: [0, -20]
  });
  public static iconPinOpen = L.icon({
    iconUrl: 'assets/images/mapa/mapmark-verde.svg',
    iconSize: [40, 60],
    popupAnchor: [0, -20]
  });
  public static iconMyPosition = L.icon({
    iconUrl: 'assets/images/mapa/oval-icon.svg',
    iconSize: [80, 80],
    popupAnchor: [0, -20]
  });

}
