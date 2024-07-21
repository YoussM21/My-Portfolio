import * as THREE from 'three';
import App from '../App.js';
import ModelManager from '../UI/ModalManager.js';

export default class Portal {
    constructor(portalMesh, modalInfo){
        this.app = new App();
        this.portalMesh = portalMesh;
        this.modalInfo = modalInfo;
        this.modelManager = new ModelManager();
    }

    loop(){
        this.character = this.app.world.character.instance;
        if(this.character){
            const portalPosition = new THREE.Vector3();
            this.portalMesh.getWorldPosition(portalPosition);

            const distance = this.character.position.distanceTo(portalPosition);
            const isNear = distance < 1.5;
            if (isNear) {
                this.modelManager.openModal(this.modalInfo.title, this.modalInfo.description);
            }
        }
    }
}