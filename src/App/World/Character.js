import * as THREE from "three";
import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";


export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.assetStore = assetStore.getState();
    this.avatar = this.assetStore.loadedAssets.avatar;

    const geometry = new THREE.BoxGeometry(2, 5, 2);
    const material = new THREE.MeshStandardMaterial({
      color: "magenta",
      wireframe: true,
      visible: false
    });
    this.instance = new THREE.Mesh(geometry, material);
    this.instance.position.set(0, 4, 0);
    this.scene.add(this.instance);

    const avatar = this.avatar.scene;
    avatar.scale.setScalar(3);
    avatar.position.y = -2.5;
    avatar.rotation.y = Math.PI;
    this.instance.add(avatar);

  }
}