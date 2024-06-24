import * as THREE from 'three';

import App from '../App.js';
import { appStateStore } from '../Utils/Store.js';

export default class Physics {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;

        this.meshMap = new Map();  

        import('@dimforge/rapier3d').then(RAPIER => {
            const gravity = {
                x: 0.0,
                y: -9.81,
                z: 0.0
            };
            this.world = new RAPIER.World(gravity);
            this.rapier = RAPIER;
            
    
            const groundGeometry = new THREE.BoxGeometry(20,1,20);
            const groundMaterial = new THREE.MeshStandardMaterial({ color: 'turquoise' });
            this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
            this.scene.add(this.groundMesh);

            // Rapier
            const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
            this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);

            const groundColliderType = RAPIER.ColliderDesc.cuboid(10, 0.5, 10);
            this.world.createCollider(groundColliderType, this.groundRigidBody);
            
            this.rapierLoaded = true;
            appStateStore.setState({ physicsReady: true });
        });
    }

    add(mesh) {
        const rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
        this.rigidBody = this.world.createRigidBody(rigidBodyType);

        const worldposition = mesh.getWorldPosition(new THREE.Vector3());
        const worldrotation = mesh.getWorldQuaternion(new THREE.Quaternion());

        this.rigidBody.setTranslation(worldposition)
        this.rigidBody.setRotation(worldrotation)

        const dimensions = this.computeCubiodDimensions(mesh);

        const colliderType = this.rapier.ColliderDesc.cuboid(dimensions.x/2, dimensions.y/2, dimensions.z/2);
        this.world.createCollider(colliderType, this.rigidBody);
        
        this.meshMap.set(mesh, this.rigidBody);
    }

    computeCubiodDimensions(mesh) {
        mesh.geometry.computeBoundingBox();
        const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());
        const worldScale = mesh.getWorldScale(new THREE.Vector3());
        size.multiply(worldScale);

        return size;
    }

    loop() {
        if (!this.rapierLoaded) return
            
        this.world.step();

        this.meshMap.forEach((rigidBody, mesh) => {
            const position = new THREE.Vector3().copy(rigidBody.translation());
            const rotation = new THREE.Quaternion().copy(rigidBody.rotation());

            // mesh.parent.worldToLocal(position);

            position.applyMatrix4(
                new THREE.Matrix4().copy(mesh.parent.matrixWorld).invert()
            )

            const inverseParentMatrix = new THREE.Matrix4()
            .extractRotation(mesh.parent.matrixWorld)
            .invert();

            const inverseParentRotation = 
            new THREE.Quaternion().setFromRotationMatrix(inverseParentMatrix);
            rotation.premultiply(inverseParentRotation);

            mesh.position.copy(position);
            mesh.quaternion.copy(rotation);
        });
    }
}