export class Loop {
  constructor(scene, camera, renderer, level) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.level = level;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Logik Update
    this.level.update();

    // Kamera folgt Spieler
    if (this.level.player) {
        this.camera.follow(this.level.player.mesh);
    }

    // Render
    this.renderer.instance.render(this.scene.instance, this.camera.instance);
  }
}
