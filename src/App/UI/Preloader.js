import assetStore from '../Utils/AssetStore.js';
import { appStateStore } from '../Utils/Store.js';

const BOOT_LINES = [
    { text: 'YOUSSEF.EXE  —  v4.0',             cls: 'tl-title',  delay: 0    },
    { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',   cls: 'tl-divider',delay: 120  },
    { text: '',                                    cls: '',          delay: 380  },
    { text: '> Locating clearing...',              cls: 'tl-cmd',   delay: 560  },
    { text: '> Kindling fog...',                   cls: 'tl-cmd',   delay: 960  },
    { text: '> Lighting lanterns...',              cls: 'tl-cmd',   delay: 1360 },
    { text: '',                                    cls: '',          delay: 1660 },
    { text: 'PORTALS DISCOVERED:',                 cls: 'tl-label', delay: 1820 },
    { text: '  ⚽  THE PITCH ............ READY', cls: 'tl-green', delay: 2180 },
    { text: '  🔐  THE TERMINAL ......... READY', cls: 'tl-blue',  delay: 2520 },
    { text: '  📸  THE DARKROOM ......... READY', cls: 'tl-red',   delay: 2860 },
    { text: '  📨  A LETTER ............. WAITS', cls: 'tl-amber', delay: 3200 },
];

const READY_LINES = [
    { text: '',                       cls: '',         delay: 0   },
    { text: '> The path is clear.',   cls: 'tl-cmd',  delay: 200 },
    { text: '> ENTER WHEN READY.',    cls: 'tl-ready',delay: 520 },
];

export default class Preloader {
    constructor() {
        this.overlay        = document.querySelector('.overlay');
        this.loadingScreen  = document.querySelector('.loading-screen');
        this.loadingBarFill = document.getElementById('loadingBarFill');
        this.startButton    = document.querySelector('.start');
        this.terminalBody   = document.getElementById('terminalBody');
        this.cursor         = document.getElementById('terminalCursor');

        this.bootDone   = false;
        this.assetsDone = false;

        this._runBootLines();

        assetStore.subscribe((state) => {
            const loaded = Object.keys(state.loadedAssets).length;
            const total  = state.assetsToLoad.length;
            if (total === 0) return;

            const pct = Math.trunc((loaded / total) * 100);
            document.getElementById('progressPercentage').textContent = pct;
            if (this.loadingBarFill) this.loadingBarFill.style.transform = `scaleX(${pct / 100})`;

            if (pct === 100 && !this.assetsDone) {
                this.assetsDone = true;
                appStateStore.setState({ assetsReady: true });
                this._tryShowReady();
            }
        });
    }

    _addLine(text, cls) {
        const line = document.createElement('div');
        line.className = 'terminal-line' + (cls ? ' ' + cls : '');
        line.textContent = text;
        this.terminalBody.insertBefore(line, this.cursor);
        requestAnimationFrame(() => requestAnimationFrame(() => line.classList.add('visible')));
    }

    _runBootLines() {
        const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay;
        BOOT_LINES.forEach(({ text, cls, delay }) => {
            setTimeout(() => this._addLine(text, cls), delay);
        });
        setTimeout(() => {
            this.bootDone = true;
            this._tryShowReady();
        }, lastDelay + 400);
    }

    _tryShowReady() {
        if (!this.bootDone || !this.assetsDone) return;

        const lastDelay = READY_LINES[READY_LINES.length - 1].delay;
        READY_LINES.forEach(({ text, cls, delay }) => {
            setTimeout(() => this._addLine(text, cls), delay);
        });
        setTimeout(() => this._showEnter(), lastDelay + 620);
    }

    _showEnter() {
        this.loadingScreen.classList.add('fade');
        setTimeout(() => {
            this.loadingScreen.remove();
            this.startButton.style.display = 'flex';
            this.startButton.classList.add('fadeIn');

            this.startButton.addEventListener('click', () => {
                // white flash before the world reveals
                this.overlay.classList.add('flash');
                this.startButton.classList.remove('fadeIn');
                this.startButton.classList.add('fadeOut');
                setTimeout(() => {
                    this.overlay.classList.add('fade');
                }, 80);
                setTimeout(() => {
                    this.overlay.remove();
                    this.startButton.remove();
                }, 2200);
                setTimeout(() => this._showControls(), 900);
            }, { once: true });
        }, 900);
    }

    _showControls() {
        const overlay = document.getElementById('controlsOverlay');
        if (!overlay) return;
        overlay.classList.add('visible');

        const dismiss = () => {
            overlay.classList.add('hiding');
            setTimeout(() => overlay.remove(), 600);
        };

        overlay.addEventListener('click', () => dismiss(), { once: true });
        window.addEventListener('keydown', () => dismiss(), { once: true });
    }
}
