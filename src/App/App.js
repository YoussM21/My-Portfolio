import * as THREE from 'three';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Loop from './Utils/Loop.js';
import World from './World/World.js';
import Resize from './Utils/Resize.js';
import AssetLoader from './Utils/AssetLoader.js';
import Preloader from './UI/Preloader.js';

let instance = null;

export default class App{
    constructor(){
        if(instance){
            return instance;
        }
        instance = this;

        // threejs elements
        this.canvas = document.querySelector('canvas.threejs');
        this.scene = new THREE.Scene();

        // AssetLoader
        this.assetLoader = new AssetLoader();
        this.preloader = new Preloader();
        
        // World 
        this.world = new World();

        // Camera and Renderer
        this.camera = new Camera();
        this.renderer = new Renderer();
        
        // Utils
        this.Loop = new Loop();
        this.Resize = new Resize();

        
    }
}