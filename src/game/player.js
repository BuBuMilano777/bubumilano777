import * as THREE from 'three';

export class Player {
  constructor(x, y, z) {
    this.size = 1;

    // Roter Würfel
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(x, y, z);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    // Physik Variablen
    this.velocity = new THREE.Vector3();
    this.speed = 0.15;
    this.jumpForce = 0.6;
    this.gravity = 0.025;
    this.friction = 0.85;
    
    this.isGrounded = false;
    this.keys = { w: false, a: false, s: false, d: false, space: false };
    
    this.setupInput();
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
        const k = e.key.toLowerCase();
        if(k === 'w') this.keys.w = true;
        if(k === 'a') this.keys.a = true;
        if(k === 's') this.keys.s = true;
        if(k === 'd') this.keys.d = true;
        if(e.code === 'Space' && this.isGrounded) {
            this.velocity.y = this.jumpForce;
            this.isGrounded = false;
        }
    });

    window.addEventListener('keyup', (e) => {
        const k = e.key.toLowerCase();
        if(k === 'w') this.keys.w = false;
        if(k === 'a') this.keys.a = false;
        if(k === 's') this.keys.s = false;
        if(k === 'd') this.keys.d = false;
    });
  }

  update(platforms, goal) {
    // 1. Horizontale Bewegung
    if (this.keys.w) this.velocity.z -= this.speed * 0.1;
    if (this.keys.s) this.velocity.z += this.speed * 0.1;
    if (this.keys.a) this.velocity.x -= this.speed * 0.1;
    if (this.keys.d) this.velocity.x += this.speed * 0.1;

    // Reibung
    this.velocity.x *= this.friction;
    this.velocity.z *= this.friction;

    this.mesh.position.x += this.velocity.x;
    this.mesh.position.z += this.velocity.z;

    // 2. Vertikale Bewegung
    this.velocity.y -= this.gravity;
    this.mesh.position.y += this.velocity.y;

    // Respawn bei Fall
    if (this.mesh.position.y < -10) this.reset();

    // 3. Kollisionserkennung (Vereinfachte 3D AABB)
    this.handleCollisions(platforms);

    // 4. Ziel
    if (goal && this.checkCollision(goal.box)) {
        alert("Level geschafft!");
        this.reset();
    }
  }

  handleCollisions(platforms) {
    this.isGrounded = false;
    const playerBox = new THREE.Box3().setFromObject(this.mesh);

    for (const plat of platforms) {
        if (playerBox.intersectsBox(plat.box)) {
            // Nur Landen wenn wir fallen und über der Plattform sind
            if (this.velocity.y < 0 && this.mesh.position.y > plat.mesh.position.y + 0.5) {
                this.velocity.y = 0;
                this.mesh.position.y = plat.mesh.position.y + plat.height/2 + this.size/2;
                this.isGrounded = true;
            }
        }
    }
  }

  checkCollision(box) {
      return new THREE.Box3().setFromObject(this.mesh).intersectsBox(box);
  }

  reset() {
    this.mesh.position.set(0, 5, 0);
    this.velocity.set(0, 0, 0);
  }
}
