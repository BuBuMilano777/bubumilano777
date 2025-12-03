import * as THREE from 'three';

export class GameCamera {
  constructor() {
    // 3D Perspektive
    this.instance = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );

    // Initialer Offset relativ zum Spieler
    this.offset = new THREE.Vector3(0, 10, 15);
    this.instance.position.copy(this.offset);
    this.instance.lookAt(0, 0, 0);

    window.addEventListener('resize', () => this.onResize());
  }

  follow(targetMesh) {
    if (!targetMesh) return;
    
    // Zielposition berechnen
    const targetPos = targetMesh.position.clone().add(this.offset);
    
    // Weiche Kamerafahrt (Lerp)
    this.instance.position.lerp(targetPos, 0.1);
    this.instance.lookAt(targetMesh.position);
  }

  onResize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }
}
