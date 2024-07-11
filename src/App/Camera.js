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
        600
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
    this.characterController = this.app.world.characterController?.rigidBody;
    if (this.characterController) {

      const characterPosition = this.characterController.translation();
      const characterRotation = this.characterController.rotation()

      const cameraOffset = new THREE.Vector3(0, 28, 35);
      cameraOffset.applyQuaternion(characterRotation);
      cameraOffset.add(characterPosition);

      const targetOffset = new THREE.Vector3(0, 8, 0);
      targetOffset.applyQuaternion(characterRotation);
      targetOffset.add(characterPosition);
      // const cameraLookAt = new THREE.Vector3().copy(this.character.translation());
      // cameraLookAt.y += 10;

      this.instance.position.lerp(cameraOffset, 0.1);
      this.controls.target.lerp(targetOffset, 0.1);

    }
    
    }

}
