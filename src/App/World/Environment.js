import * as THREE from 'three';
import App from '../App';

export default class Environment {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;

        this.loadEnvironment();
        this.addMeshes();
    }

    loadEnvironment() {
        
        //lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(1, 1, 1);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);

    }

    addMeshes() {
        const group = new THREE.Group();
        group.position.y = 10;
        group.rotation.x = 0.5;
        this.scene.add(group);

        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 30, 8);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.cubeMesh = new THREE.Mesh(geometry, material);
        this.cubeMesh.position.y = 10;
        this.cubeMesh.rotateX(0.5);
        this.cubeMesh.rotateZ(0.5);
        group.add(this.cubeMesh);
        this.physics.add(this.cubeMesh, 'dynamic', 'trimesh');

        this.cubeMesh2 = new THREE.Mesh(geometry, material);
        this.cubeMesh2.position.y = 10;
        this.cubeMesh2.position.x = 5;
        this.cubeMesh2.rotateX(0.5);
        this.cubeMesh2.rotateZ(0.5);
        group.add(this.cubeMesh2);
        this.physics.add(this.cubeMesh2, 'dynamic', 'trimesh');

        const groundGeometry = new THREE.BoxGeometry(20,1,20);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 'turquoise' });
        this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        this.scene.add(this.groundMesh);
        this.physics.add(this.groundMesh, 'fixed', 'cuboid');
    }
}