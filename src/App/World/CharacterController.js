import * as THREE from "three";
import App from "../App.js";
import { inputStore } from "../Utils/Store.js";

export default class CharacterController {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;
        this.character = this.app.world.character.instance;
        this.clock = new THREE.Clock();
        this.previousElapsedTime = 0;
        
        inputStore.subscribe((state) => {
            this.forward = state.forward;
            this.backward = state.backward;
            this.left = state.left;
            this.right = state.right;
        });

        this.instantiateController();
    }

    instantiateController() {
        // Check if physics is ready before proceeding
        if (!this.physics.rapier) {
            console.warn("Physics not ready. Retrying in 100ms...");
            setTimeout(() => this.instantiateController(), 100);
            return;
        }

        // create a kinematic rigid body
        this.rigidBodyType = this.physics.rapier.RigidBodyDesc.kinematicPositionBased();
        this.rigidBody = this.physics.world.createRigidBody(this.rigidBodyType);

        //create collider
        this.colliderType = this.physics.rapier.ColliderDesc.cuboid(.3, 1, .3);
        this.collider = this.physics.world.createCollider(
            this.colliderType,
            this.rigidBody
        );

        // set rigid body position to character position
        const worldPosition = this.character.getWorldPosition(new THREE.Vector3());
        const worldRotation = this.character.getWorldQuaternion(new THREE.Quaternion());
        this.rigidBody.setTranslation(worldPosition);
        this.rigidBody.setRotation(worldRotation);

        this.characterController = this.physics.world.createCharacterController(0.01);
        this.characterController.setApplyImpulsesToDynamicBodies(true);
        this.characterController.enableAutostep(0.8, 0.1, false);
        this.characterController.enableSnapToGround(1);
    }

    loop() {
        // Only proceed if the character controller is initialized
        if (!this.characterController) return;

        const deltaTime = this.clock.getDelta();
        const movement = new THREE.Vector3();

        if (this.forward) {
            movement.z -= 1;
        }
        if (this.backward) {
            movement.z += 1;
        }
        if (this.left) {
            movement.x -= 1;
        }
        if (this.right) {
            movement.x += 1;
        }

        if (movement.length() > 0) {
            const angle = Math.atan2(movement.x, movement.z) + Math.PI;
            const characterRotation = new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                angle
            );
            this.character.quaternion.slerp(characterRotation, 0.1);
        }

        movement.normalize().multiplyScalar(deltaTime * 8);
        movement.y -= 1;

        this.characterController.computeColliderMovement(this.collider, movement);
        const newPosition = new THREE.Vector3()
            .copy(this.rigidBody.translation())
            .add(this.characterController.computedMovement());
        this.rigidBody.setNextKinematicTranslation(newPosition);
        this.character.position.lerp(this.rigidBody.translation(), 0.1);
    }
}