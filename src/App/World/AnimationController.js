import * as THREE from "three";

import App from "../App.js";

export default class AnimationController {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.avatar = this.app.world.character.avatar;

        this.instantiateAnimations();
    }

    instantiateAnimations() {
        
        this.mixer = new THREE.AnimationMixer(this.avatar.scene);

        this.animations = new Map();
        this.avatar.animations.forEach((clip) => {
            this.animations.set(clip.name, this.mixer.clipAction(clip));
        });

        this.animations.get('idle').play();


        
    }

    loop(deltaTime) {
        this.mixer.update(deltaTime);
    }
}