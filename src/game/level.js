import * as THREE from 'three';
import { Player } from './player.js';
import { Platform } from './platform.js';

export class Level {
  constructor(scene) {
    this.scene = scene;
    this.platforms = [];
    this.init();
  }

  init() {
    this.player = new Player(0, 5, 0);
    this.scene.add(this.player.mesh);

    // Level-Layout
    const data = [
        { x: 0, y: 0, z: 0, w: 5, h: 1, d: 5 },       // Start
        { x: 0, y: 1, z: -6, w: 3, h: 1, d: 3 },      // Step 1
        { x: 5, y: 2, z: -6, w: 3, h: 1, d: 3 },      // Step 2
        { x: 10, y: 3, z: -6, w: 3, h: 1, d: 3 },     // Step 3
        { x: 15, y: 3, z: 0, w: 5, h: 1, d: 5 },      // Ziel-Insel
    ];

    data.forEach(p => {
        const plat = new Platform(p.x, p.y, p.z, p.w, p.h, p.d);
        this.platforms.push(plat);
        this.scene.add(plat.mesh);
    });

    // Ziel
    const goalGeo = new THREE.SphereGeometry(1);
    const goalMat = new THREE.MeshStandardMaterial({ color: 0xFFFF00, emissive: 0x222200 });
    this.goal = { mesh: new THREE.Mesh(goalGeo, goalMat) };
    this.goal.mesh.position.set(15, 5, 0);
    this.goal.box = new THREE.Box3().setFromObject(this.goal.mesh);
    this.scene.add(this.goal.mesh);
  }

  update() {
    this.player.update(this.platforms, this.goal);
    // Ziel Animation
    if (this.goal) {
        this.goal.mesh.position.y = 5 + Math.sin(Date.now() * 0.003) * 0.5;
    }
  }
}
