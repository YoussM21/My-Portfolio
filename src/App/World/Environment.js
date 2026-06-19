import * as THREE from 'three';
import App from '../App';
import assetStore from '../Utils/AssetStore';
import Portal from './Portal';
import ModelContentProvider from '../UI/ModelContentProvider';

// Portal binding: maps GLB mesh name → content key.
// Current environment.glb uses the legacy names; flip the comments when the
// forest GLB lands (mesh names defined in FOREST_SPEC.md §2).
const PORTAL_BINDINGS = [
    { meshName: 'portals',    contentKey: 'aboutMe' },
    { meshName: 'portals001', contentKey: 'projects' },
    { meshName: 'portals002', contentKey: 'myexperience' },
    // forest GLB (Phase A complete):
    // { meshName: 'portal_soccer',  contentKey: 'aboutMe' },
    // { meshName: 'portal_cyber',   contentKey: 'projects' },
    // { meshName: 'portal_photo',   contentKey: 'myexperience' },
    // { meshName: 'contact_letter', contentKey: 'contact' },
];

export default class Environment {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;
        this.assetStore = assetStore.getState();
        this.environment = this.assetStore.loadedAssets.environment;
        this.scene.fog = new THREE.FogExp2(0x0a0d12, 0.045);
        this.scene.background = new THREE.Color(0x0a0d12);
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
        // Cool low ambient — the forest reads as moonlit, not daylit.
        const ambientLight = new THREE.AmbientLight(0x6b88a0, 0.15);
        this.scene.add(ambientLight);

        // Amber rim from low-front: warmth on the character and portal faces.
        this.amberRim = new THREE.DirectionalLight(0xf59e0b, 0.4);
        this.amberRim.position.set(6, 4, 8);
        this.scene.add(this.amberRim);

        // Cyan rim from high-back: cold edge light, depth separation in fog.
        this.cyanRim = new THREE.DirectionalLight(0x00ffc8, 0.4);
        this.cyanRim.position.set(-6, 12, -8);
        this.cyanRim.castShadow = true;
        this.cyanRim.shadow.camera.top = 30;
        this.cyanRim.shadow.camera.bottom = -30;
        this.cyanRim.shadow.camera.left = -30;
        this.cyanRim.shadow.camera.right = 30;
        this.cyanRim.shadow.bias = -0.002;
        this.cyanRim.shadow.normalBias = 0.072;
        this.scene.add(this.cyanRim);
    }

    addPortals() {
        const modelContentProvider = new ModelContentProvider();

        this.portals = PORTAL_BINDINGS
            .map(({ meshName, contentKey }) => {
                const mesh = this.environment.scene.getObjectByName(meshName);
                if (!mesh) return null;
                return new Portal(mesh, modelContentProvider.getModalInfo(contentKey));
            })
            .filter(Boolean);
    }

    loop(){
        for (const portal of this.portals) portal.loop();
    }

}