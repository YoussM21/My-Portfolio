import { inputStore } from '../Utils/Store.js';

export default class InputController {
    constructor() {
        this.startListening();
        this.inputStore = inputStore;
    }

    startListening() {
        window.addEventListener('keydown', (event) => this.onKeyDown(event))
        window.addEventListener('keyup', (event) => this.onKeyUp(event))
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'KeyW':
                inputStore.setState({forward: true});
                break;  
            case 'KeyA':
                inputStore.setState({left: true});
                break;
            case 'KeyS':
                inputStore.setState({backward: true});
                break;
            case 'KeyD':
                inputStore.setState({right: true});
                break;
            
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case 'KeyW':
                inputStore.setState({forward: false});
                break;  
            case 'KeyA':
                inputStore.setState({left: false});
                break;
            case 'KeyS':
                inputStore.setState({backward: false});
                break;
            case 'KeyD':
                inputStore.setState({right: false});
                break;
            
        }
    }
}