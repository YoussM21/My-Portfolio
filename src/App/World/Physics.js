import * as THREE from "three";
import App from "../App.js";
import { appStateStore } from "../Utils/Store.js";

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.meshMap = new Map();
    this.rapierLoaded = false;

    
  }

  async initialize() {
    await import("@dimforge/rapier3d-compat").then(async (RAPIER) => {
        await RAPIER.init()
        const gravity = { x: 0.0, y: -9.81, z: 0.0 };
        const worldInstance = new RAPIER.World(gravity);
        this.rapier = RAPIER
        this.world = worldInstance;

      // Rapier
      // const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
      // this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);

      // const groundColliderType = RAPIER.ColliderDesc.cuboid(10, 0.5, 10);
      // this.world.createCollider(groundColliderType, this.groundRigidBody);

        this.rapierLoaded = true;
        appStateStore.setState({ physicsReady: true });
    });
  }

  async add(mesh, type, collider) {
    if (!this.rapierLoaded) {
      throw new Error("Rapier is not loaded yet. Call initialize() first.");
    }

    let rigidBodyType;
    switch (type) {
      case "dynamic":
        rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
        break;
      case "fixed":
        rigidBodyType = this.rapier.RigidBodyDesc.fixed();
        break;
      case "kinematic":
        rigidBodyType = this.rapier.RigidBodyDesc.kinematicPositionBased();
        break;
    }
    this.rigidBody = this.world.createRigidBody(rigidBodyType);

    let colliderType;
    switch (collider) {
      case "cuboid":
        const dimensions = this.computeCubiodDimensions(mesh);
        colliderType = this.rapier.ColliderDesc.cuboid(
          dimensions.x / 2,
          dimensions.y / 2,
          dimensions.z / 2
        );
        break;
      case "ball":
        const radius = this.computeBallDimensions(mesh);
        colliderType = this.rapier.ColliderDesc.ball(radius);
        break;
      case "trimesh":
        const { scaledVertices, indices } = this.computeTrimeshDimensions(mesh);
        colliderType = this.rapier.ColliderDesc.trimesh(
          scaledVertices,
          indices
        );
        break;
    }
    this.world.createCollider(colliderType, this.rigidBody);

    const worldposition = mesh.getWorldPosition(new THREE.Vector3());
    const worldrotation = mesh.getWorldQuaternion(new THREE.Quaternion());
    this.rigidBody.setTranslation(worldposition);
    this.rigidBody.setRotation(worldrotation);

    this.meshMap.set(mesh, this.rigidBody);
    return this.rigidBody;
  }

  computeCubiodDimensions(mesh) {
    mesh.geometry.computeBoundingBox();
    const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());
    const worldScale = mesh.getWorldScale(new THREE.Vector3());
    size.multiply(worldScale);
    return size;
  }

  computeBallDimensions(mesh) {
    mesh.geometry.computeBoundingSphere();
    const radius = mesh.geometry.boundingSphere.radius;
    const worldScale = mesh.getWorldScale(new THREE.Vector3());
    const maxScale = Math.max(worldScale.x, worldScale.y, worldScale.z);
    return radius * maxScale;
  }

  computeTrimeshDimensions(mesh) {
    const vertices = mesh.geometry.attributes.position.array;
    const indices = mesh.geometry.index.array;
    const worldScale = mesh.getWorldScale(new THREE.Vector3());

    const scaledVertices = vertices.map((vertex, index) => {
      return vertex * worldScale.getComponent(index % 3);
    });

    return { scaledVertices, indices };
  }

  loop() {
    if (!this.rapierLoaded) return;

    this.world.step();

    this.meshMap.forEach((rigidBody, mesh) => {
      const position = new THREE.Vector3().copy(rigidBody.translation());
      const rotation = new THREE.Quaternion().copy(rigidBody.rotation());

      position.applyMatrix4(
        new THREE.Matrix4().copy(mesh.parent.matrixWorld).invert()
      );

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
