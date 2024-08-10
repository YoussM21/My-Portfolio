import * as THREE from 'three';
import App from '../App';
import assetStore from '../Utils/AssetStore';
import Portal from './Portal';
import ModelContentProvider from '../UI/ModelContentProvider';

export default class Environment {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;
        this.assetStore = assetStore.getState();
        this.environment = this.assetStore.loadedAssets.environment;
        this.loadEnvironment();
        this.addLights();
        this.addPortals();
    }

    loadEnvironment() {
        const environmentScene = this.environment.scene;
        this.scene.add(environmentScene);
        environmentScene.position.set(-4.8, 0, -7.4);
        environmentScene.rotation.set(0, -.60, 0);
        environmentScene.scale.setScalar(1.3)

        const physicalObjects = [
            'floor',
            'trees',
            'rocks',
            'bushes',
            'terrain',
            'stairs',
            'gates'
        ]
        const shadowCasters = [
            'trees',
            'rocks',
            'bushes',
            'terrain',
            'stairs',
            'gates'
        ]
        const shadowReceivers = [
            'floor',
            'terrain'
        ]

        for (const child of environmentScene.children) {
            const isphysicalObject = physicalObjects.some((keyword) => child.name.includes(keyword));
            if (isphysicalObject) {
                this.addPhysicsToObject(child);
            }

            const isShadowCaster = shadowCasters.some((keyword) => child.name.includes(keyword));
            if (isShadowCaster) {
                child.traverse((obj) => {
                    if (obj.isMesh) {
                        obj.castShadow = true;
                    }
                })
            }

            const isShadowReceiver = shadowReceivers.some((keyword) => child.name.includes(keyword));
            if (isShadowReceiver) {
                child.traverse((obj) => {
                    if (obj.isMesh) {
                        obj.receiveShadow = true;
                    }
                })
            }
        }
    }

    addPhysicsToObject(object) {
        object.traverse((obj) => {
            if (obj.isMesh) {
                // Use the async add method, but don't await it
                this.physics.add(obj, 'fixed', 'cuboid').catch(error => {
                    console.error("Failed to add physics to object:", error);
                });
            }
        })
    }


    addLights() {
        //lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(1, 1, 1);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.camera.top = 30;
        this.directionalLight.shadow.camera.bottom = -30;
        this.directionalLight.shadow.camera.left = -30;
        this.directionalLight.shadow.camera.right = 30;
        this.directionalLight.shadow.bias = -0.002;
        this.directionalLight.shadow.normalBias = 0.072;



        this.scene.add(this.directionalLight);
    }

    addPortals() {

        const portalMesh1 = this.environment.scene.getObjectByName('portals');
        const portalMesh2 = this.environment.scene.getObjectByName('portals001');
        const portalMesh3 = this.environment.scene.getObjectByName('portals002');

        const modelContentProvider = new ModelContentProvider();

       this.portal1 = new Portal(portalMesh1, modelContentProvider.getModalInfo('aboutMe'));
       this.portal2 = new Portal(portalMesh2, modelContentProvider.getModalInfo('projects'));
       this.portal3 = new Portal(portalMesh3, modelContentProvider.getModalInfo('myexperience'));
    }

    loop(){
        this.portal1.loop();
        this.portal2.loop();
        this.portal3.loop();
    }

}