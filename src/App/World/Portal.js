import * as THREE from 'three';
import App from '../App.js';
import ModelManager from '../UI/ModalManager.js';

const THEME_COLORS = {
    amber: 0xf59e0b,
    blue:  0x3b82f6,
    cyan:  0x00ffc8,
};

export default class Portal {
    constructor(portalMesh, modalInfo){
        this.app = new App();
        this.portalMesh = portalMesh;
        this.modalInfo = modalInfo;
        this.modelManager = new ModelManager();

        const baseHex = THEME_COLORS[modalInfo.theme] ?? THEME_COLORS.cyan;

        const farColor  = new THREE.Color(baseHex);
        const nearColor = new THREE.Color(baseHex).lerp(new THREE.Color(0xffffff), 0.45);

        this.portalFarMaterial = new THREE.MeshBasicMaterial({
            color: farColor,
            transparent: true,
            opacity: 0.5,
        });

        this.portalNearMaterial = new THREE.MeshBasicMaterial({
            color: nearColor,
            transparent: true,
            opacity: 0.85,
        });

        this.portalMesh.material = this.portalFarMaterial;
        this.previusNear = false;
    }

    loop(){
        this.character = this.app.world.character.instance;
        if(this.character){
            const portalPosition = new THREE.Vector3();
            this.portalMesh.getWorldPosition(portalPosition);

            const distance = this.character.position.distanceTo(portalPosition);
            const isNear = distance < 1.5;

            if (isNear) {
                if (!this.previusNear) {
                    this.modelManager.openModal(this.modalInfo.title, this.modalInfo.description, this.modalInfo.theme);
                    this.portalMesh.material = this.portalNearMaterial;
                }
                // activated pulse: bright, faster
                this.portalNearMaterial.opacity = 0.7 + Math.sin(Date.now() * 0.005) * 0.25;
                this.previusNear = true;
            } else {
                if (this.previusNear) {
                    this.modelManager.closeModal();
                    this.portalMesh.material = this.portalFarMaterial;
                }
                // idle pulse: subtle, slow
                this.portalFarMaterial.opacity = 0.35 + Math.sin(Date.now() * 0.0018) * 0.15;
                this.previusNear = false;
            }
        }
    }
}
