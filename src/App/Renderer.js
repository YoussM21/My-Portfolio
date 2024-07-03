import * as THREE from 'three';
import App from './App.js';
import { sizeStore } from './Utils/Store.js';

export default class Renderer {
  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;
    this.camera = this.app.camera;
    this.scene = this.app.scene;
    this.sizeStore = sizeStore;
    this.sizes = this.sizeStore.getState();
    this.setInstance();
    this.setResizeListener();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
          });
          this.instance.setSize(this.sizes.width, this.sizes.height);
          this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          this.instance.outputEncoding = THREE.sRGBEncoding;
        }

    setResizeListener() {
        this.sizeStore.subscribe((sizes) => {
            this.instance.setSize(sizes.width, sizes.height);
            this.instance.setPixelRatio(sizes.pixelRatio);
        });
    }
    
    loop() {
        this.instance.render(this.scene, this.camera.instance);
    }


}



