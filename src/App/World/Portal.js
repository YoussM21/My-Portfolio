import * as THREE from 'three';
import App from '../App.js';
import ModelManager from '../UI/ModalManager.js';

export default class Portal {
    constructor(portalMesh, modalInfo){
        this.app = new App();
        this.portalMesh = portalMesh;
        this.modalInfo = modalInfo;
        this.modelManager = new ModelManager();

        this.portalNearMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });

        this.portalFarMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ffff,
            transparent: true,
            opacity: 0.8
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
                this.modelManager.openModal(this.modalInfo.title, this.modalInfo.description);
                this.portalMesh.material = this.portalNearMaterial;
            }
            this.previusNear = true;
            } else {
                if (this.previusNear) {
                this.modelManager.closeModal();
                this.portalMesh.material = this.portalFarMaterial;
            }
            this.previusNear = false
            }
        }
    }
}