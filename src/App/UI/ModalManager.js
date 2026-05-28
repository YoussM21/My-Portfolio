const THEMES = {
    amber: {
        accentColor: '#f59e0b',
        label: 'PLAYER.INFO',
        tags: `<span class="modal-tag tag-amber">📸 photography</span><span class="modal-tag tag-green">⚽ soccer</span>`,
    },
    blue: {
        accentColor: '#3b82f6',
        label: 'CAREER.LOG',
        tags: `<span class="modal-tag tag-blue">🔐 cyber ops</span><span class="modal-tag tag-cyan">🎮 game dev</span>`,
    },
    cyan: {
        accentColor: '#00ffc8',
        label: 'BUILD.DIR',
        tags: `<span class="modal-tag tag-cyan">🎮 game dev</span><span class="modal-tag tag-blue">🔐 cyber ops</span>`,
    },
};

export default class ModalManager {
    constructor() {
        this.modal    = document.getElementById('myModal');
        this.closeBtn = document.getElementById('modalClose');
        this.closeBtn.onclick = () => this.closeModal();

        // click on the dark backdrop (outside the panel) also closes
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }

    openModal(title, description, theme = 'cyan') {
        const t = THEMES[theme] || THEMES.cyan;

        this.modal.style.setProperty('--modal-accent', t.accentColor);
        document.getElementById('modalHeroLabel').textContent  = t.label;
        document.getElementById('modalTitle').textContent      = title;
        document.getElementById('modalDescription').innerHTML  = description;
        document.getElementById('modalTags').innerHTML         = t.tags;

        this.modal.style.display = 'block';
        this.modal.classList.remove('fadeOut');
        this.modal.classList.add('fadeIn');
    }

    closeModal() {
        this.modal.classList.remove('fadeIn');
        this.modal.classList.add('fadeOut');
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 500);
    }
}
