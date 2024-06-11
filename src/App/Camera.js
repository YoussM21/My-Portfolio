import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import App from './App.js';

export default class Camera {
  constructor() {
   this.app = new App();
   this.canvas = this.app.canvas;
   this.setInstance()
   this.setControls()
  }

  // initialize the camera
  setInstance() {
     this.instance = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        200
      );
      this.instance.position.z = 5;
  }

  // add orbit controls
  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  // render loop
  loop() {
    this.controls.update();
  }

}
