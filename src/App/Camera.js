import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { sizeStore } from "./Utils/Store.js";

import App from './App.js';

export default class Camera {
  constructor() {
   this.app = new App();
   this.canvas = this.app.canvas;

   this.sizeStore = sizeStore;
   this.sizes = this.sizeStore.getState();
   
   this.setInstance()
   this.setControls()
   this.setResizeListener()
  }

  // initialize the camera
  setInstance() {
     this.instance = new THREE.PerspectiveCamera(
        35,
        this.sizes.width /this.sizes.height,
        1,
        400
      );
      this.instance.position.z = 100;
  }

  // add orbit controls
  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  // resize listener
  setResizeListener() {
    this.sizeStore.subscribe((sizes) => {
      this.instance.aspect = sizes.width / sizes.height;
      this.instance.updateProjectionMatrix();
    });
      

  }
    

  // render loop
  loop() {
    this.controls.update();
  }

}
