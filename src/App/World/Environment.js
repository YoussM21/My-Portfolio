import * as THREE from 'three';
import App from '../App';
import assetStore from '../Utils/AssetStore';
import { min } from 'three/examples/jsm/nodes/Nodes.js';

export default class Environment {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;
        this.pane = this.app.gui.pane;

        this.assetStore = assetStore.getState();
        this.environment = this.assetStore.loadedAssets.environment;

        this.loadEnvironment();
        this.addLights();
    }

    loadEnvironment() {
        const environmentScene = this.environment.scene;
        this.scene.add(environmentScene);

        this.pane.addInput(
            environmentScene,
            'position',
            {
                label: 'Position',
                min: -100,
                max: 100,
                step: 0.1,
            }
        )

        this.pane.addInput(
            environmentScene,
            'rotation',
            {
                label: 'Rotation',
                min: -Math.PI,
                max: Math.PI,
                step: 0.01,
            }
        )

        const scale = { value:1 };

        this.pane.addInput(
            scale,
            'value',
            {
                label: 'Scale',
                min: 0,
                max: 3,
                step: 0.01,
            }).on('change', () => {
                environmentScene.scale.setScalar(scale.value);
            })

        environmentScene.position.set(-4.8, 0, -7.4);
        environmentScene.rotation.set(0, -.60, 0);
        environmentScene.scale.setScalar(1.3)

        environmentScene.traverse((obj) => {
            if (obj.isMesh) {
                this.physics.add(obj, 'fixed', 'cuboid');
            }
        });
    }

    addLights() {
        //lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(1, 1, 1);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);
    }

}