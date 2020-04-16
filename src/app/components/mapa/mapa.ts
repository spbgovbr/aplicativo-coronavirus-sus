import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { MapUtil } from '../../services/map-util';

@Component({
  selector: 'mapa',
  templateUrl: 'mapa.html'
})
export class MapaComponent implements OnDestroy, OnInit {

  @ViewChild('mapElement', {static: true}) mapElement: ElementRef;
  map: L.Map;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onLoadMap = new EventEmitter<L.Map>();

  @Input() latitude: any;
  @Input() longitude: any;

  constructor(
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    setTimeout(() => this.getMap(), 500);
  }

  ngOnDestroy() {
    this.removeMapa();
  }

  removeMapa() {
    this.map.remove();
  }

  private getMap(): L.Map {
    this.map = new L.Map(this.mapElement.nativeElement, {
      zoomControl: false,
      attributionControl: false,
    }).setView([-15.8449839, -47.8813165], 10);
    this.map.addLayer(MapUtil.options.layer);
    this.onLoadMap.emit(this.map);
  }

}
