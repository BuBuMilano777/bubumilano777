import * as THREE from 'three';

export class GameScene {
  constructor() {
    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(0x87CEEB);
    this.instance.fog = new THREE.Fog(0x87CEEB, 20, 60);

    this.addLights();
  }

  addLights() {
    // Ambient für Grundhelligkeit
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.instance.add(ambient);

    // Sonne für Schatten
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(10, 20, 10);
    sun.castShadow = true;
    
    // Schattenbereich optimieren
    sun.shadow.camera.left = -30;
    sun.shadow.camera.right = 30;
    sun.shadow.camera.top = 30;
    sun.shadow.camera.bottom = -30;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;

    this.instance.add(sun);
  }

  add(object) {
    this.instance.add(object);
  }
}
