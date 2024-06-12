import { createStore } from 'zustand/vanilla';

 export const sizeStore = createStore(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)

}));