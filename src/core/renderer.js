import * as THREE from 'three';

export class GameRenderer {
  constructor() {
    this.instance = new THREE.WebGLRenderer({ antialias: true });
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Schatten aktivieren
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.instance.domElement);
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
