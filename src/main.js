import { GameRenderer } from './core/renderer.js';
import { GameCamera } from './core/camera.js';
import { GameScene } from './core/scene.js';
import { Loop } from './core/loop.js';
import { Level } from './game/level.js';

class Game {
  constructor() {
    this.renderer = new GameRenderer();
    this.scene = new GameScene();
    this.camera = new GameCamera();
    this.level = new Level(this.scene);
    this.loop = new Loop(this.scene, this.camera, this.renderer, this.level);
    
    this.loop.start();
  }
}

new Game();
