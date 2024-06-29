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
      this.instance.position.y = 20;
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
    this.character = this.app.world.character?.rigidBody;
    if (this.character) {

      const characterPosition = this.character.translation();
      const characterRotation = this.character.rotation()

      const cameraOffset = new THREE.Vector3(0, 30, 55);
      cameraOffset.applyQuaternion(characterRotation);
      cameraOffset.add(characterPosition);

      const targetOffset = new THREE.Vector3(0, 10, 0);
      targetOffset.applyQuaternion(characterRotation);
      targetOffset.add(characterPosition);
      // const cameraLookAt = new THREE.Vector3().copy(this.character.translation());
      // cameraLookAt.y += 10;

      this.instance.position.copy(cameraOffset);
      this.controls.target.copy(targetOffset);

    }
    
    }

}
