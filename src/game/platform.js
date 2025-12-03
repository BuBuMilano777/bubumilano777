import * as THREE from 'three';

export class Platform {
  constructor(x, y, z, width, height, depth, color = 0x8B4513) {
    this.width = width;
    this.height = height;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: color });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(x, y, z);
    
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.box = new THREE.Box3().setFromObject(this.mesh);
  }
}