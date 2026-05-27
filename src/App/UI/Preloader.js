import assetStore from '../Utils/AssetStore.js';
import { appStateStore } from '../Utils/Store.js';

export default class Preloader {
    constructor() {
        this.assetStore = assetStore;

        this.overlay = document.querySelector('.overlay');
        this.loadingScreen = document.querySelector('.loading-screen');
        this.loadingBarFill = document.getElementById('loadingBarFill');
        this.startButton = document.querySelector('.start');

        this.assetStore.subscribe((state) => {
            this.numOfLoadedAssets = Object.keys(state.loadedAssets).length;
            this.numOfAssetsToLoad = state.assetsToLoad.length;
            this.progress = this.numOfLoadedAssets / this.numOfAssetsToLoad;
            this.progress = Math.trunc(this.progress * 100);

            document.getElementById('progressPercentage').innerHTML = this.progress;
            if (this.loadingBarFill) {
                this.loadingBarFill.style.width = this.progress + '%';
            }

            if (this.progress === 100) {
                appStateStore.setState({ assetsReady: true });
                this.loadingScreen.classList.add('fade');
                window.setTimeout(() => this.ready(), 1200);
            }
        });
    }

    showControls() {
        const overlay = document.getElementById('controlsOverlay');
        if (!overlay) return;

        overlay.classList.add('visible');

        const dismiss = () => {
            overlay.classList.add('hiding');
            window.setTimeout(() => overlay.remove(), 600);
        };

        overlay.addEventListener('click', () => dismiss(), { once: true });
    }

    ready() {
        this.loadingScreen.remove();
        this.startButton.style.display = 'inline';
        this.startButton.classList.add('fadeIn');

        this.startButton.addEventListener('click', () => {
            this.overlay.classList.add('fade');
            this.startButton.classList.add('fadeOut');

            window.setTimeout(() => {
                this.overlay.remove();
                this.startButton.remove();
            }, 2000);

            window.setTimeout(() => this.showControls(), 800);
        }, { once: true });
    }
}