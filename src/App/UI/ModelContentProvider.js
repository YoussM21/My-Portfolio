

export default class ModelContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        theme: 'amber',
        title: `Hi, I'm Youssef.`,
        description: `
          <div class="about-header">
            <div class="about-intro">
                <div class="interest-badges">
                <span class="interest-badge">⚽ Soccer</span>
                <span class="interest-badge">🎮 Game Dev</span>
                <span class="interest-badge">🔐 Cybersecurity</span>
                <span class="interest-badge">📸 Photography</span>
              </div>
            </div>
            <img src="../../assets/ReadyPlayerMe-Avatar 1.svg" alt="Youssef avatar" class="about-avatar">
          </div>
          <p>The 3D world you just walked through to get here? I built that. It's probably the most honest introduction I can give — I'm a software engineering student at the University of Ottawa who spends a lot of time thinking about what's possible in a browser.</p>
          <p>Off-screen I'm on a soccer pitch or hunting the perfect shot with a camera. In between, I dig into cybersecurity — how systems break, how they're protected, and what lives in the gaps between the two.</p>
          <p>I've interned at Transport Canada, Statistics Canada, and Sliike Corporation — across app development, data science, and UI/UX design. Fast learner, team player, currently open to what's next.</p>
          <div class="modal-footer">
            <div class="modal-footer-links">
              <a href="https://www.linkedin.com/in/youssefmroue/" target="_blank" class="footer-link">
                <img src="../../assets/icons8-linkedin-24.png" alt="LinkedIn"> LinkedIn
              </a>
              <a href="https://github.com/YoussM21" target="_blank" class="footer-link">
                <img src="../../assets/icons8-github-24.png" alt="GitHub"> GitHub
              </a>
              <a href="mailto:mroueh.youssef10@gmail.com" class="footer-link">
                <img src="../../assets/icons8-mail-24.png" alt="Email"> Email
              </a>
            </div>
            <a href="https://youssef-mroue-resume.tiiny.site" target="_blank" class="footer-link">
              <img src="../../assets/icons8-resume-24.png" alt="Resume"> View Resume ↗
            </a>
          </div>
        `,
      },
      myexperience: {
        theme: 'blue',
        title: `My Experience`,
        description: `
          <div class="exp-list">
            <div class="exp-card">
              <div class="exp-header">
                <span class="exp-company">Transport Canada</span>
                <span class="exp-date">2023</span>
              </div>
              <p class="exp-role">Application Developer · Agile Scrum Master</p>
              <p class="exp-desc">Built internal tools with Microsoft Power Apps and kept two teams moving as Scrum Master. Learned that the most critical software is often the least glamorous — and that good process matters as much as good code.</p>
              <div class="tech-tags">
                <span class="tech-tag">Power Apps</span>
                <span class="tech-tag">Power Automate</span>
                <span class="tech-tag">Agile</span>
                <span class="tech-tag">Scrum</span>
              </div>
            </div>

            <div class="exp-card">
              <div class="exp-header">
                <span class="exp-company">Statistics Canada</span>
                <span class="exp-date">2022</span>
              </div>
              <p class="exp-role">Data Scientist · Junior Analyst</p>
              <p class="exp-desc">Wrangled census-scale datasets in Python and R, built visualizations that made the numbers tell a story, and contributed to predictive models. Numbers have a lot to say — you just have to know how to ask.</p>
              <div class="tech-tags">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">R</span>
                <span class="tech-tag">Data Viz</span>
                <span class="tech-tag">Machine Learning</span>
              </div>
            </div>

            <div class="exp-card">
              <div class="exp-header">
                <span class="exp-company">Sliike Corporation</span>
                <span class="exp-date">2021</span>
              </div>
              <p class="exp-role">UI/UX Designer · Junior Web Developer</p>
              <p class="exp-desc">Designed and shipped interfaces for web and mobile in a fast-moving Agile team. First time realizing how much the way something looks shapes the way it gets used.</p>
              <div class="tech-tags">
                <span class="tech-tag">Figma</span>
                <span class="tech-tag">React</span>
                <span class="tech-tag">UI/UX</span>
                <span class="tech-tag">Agile</span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-links">
              <a href="https://www.linkedin.com/in/youssefmroue/" target="_blank" class="footer-link">
                <img src="../../assets/icons8-linkedin-24.png" alt="LinkedIn"> LinkedIn
              </a>
              <a href="https://github.com/YoussM21" target="_blank" class="footer-link">
                <img src="../../assets/icons8-github-24.png" alt="GitHub"> GitHub
              </a>
            </div>
            <a href="https://youssef-mroue-resume.tiiny.site" target="_blank" class="footer-link">
              <img src="../../assets/icons8-resume-24.png" alt="Resume"> View Resume ↗
            </a>
          </div>
        `,
      },
      projects: {
        theme: 'cyan',
        title: `My Projects`,
        description: `
          <div class="projects-grid">

            <a href="https://github.com/YoussM21" target="_blank" class="project-card">
              <div class="project-header">
                <span class="project-name">This Portfolio</span>
                <span class="project-arrow">↗</span>
              </div>
              <p class="project-desc">A 3D interactive world with a physics-enabled character and proximity-triggered portals. You're literally inside it right now.</p>
              <div class="tech-tags">
                <span class="tech-tag">Three.js</span>
                <span class="tech-tag">Rapier3D</span>
                <span class="tech-tag">Zustand</span>
                <span class="tech-tag">Vite</span>
              </div>
            </a>

            <a href="https://github.com/YoussM21/innfinity" target="_blank" class="project-card">
              <div class="project-header">
                <span class="project-name">Innfinity</span>
                <span class="project-arrow">↗</span>
              </div>
              <p class="project-desc">Full-stack hotel booking platform with room customization, PostgreSQL database, React frontend and Express backend.</p>
              <div class="tech-tags">
                <span class="tech-tag">React</span>
                <span class="tech-tag">Express</span>
                <span class="tech-tag">PostgreSQL</span>
              </div>
            </a>

            <a href="https://github.com/YoussM21/stellarquest" target="_blank" class="project-card">
              <div class="project-header">
                <span class="project-name">StellarQuest</span>
                <span class="project-arrow">↗</span>
              </div>
              <p class="project-desc">Book tickets to other planets and browse NASA's Picture of the Day by date. Space tourism, basically.</p>
              <div class="tech-tags">
                <span class="tech-tag">React</span>
                <span class="tech-tag">NASA API</span>
              </div>
            </a>

            <a href="https://github.com/YoussM21/Mealer-App" target="_blank" class="project-card">
              <div class="project-header">
                <span class="project-name">Mealer</span>
                <span class="project-arrow">↗</span>
              </div>
              <p class="project-desc">Android app connecting hungry people with home chefs running small food businesses. Uber Eats but personal.</p>
              <div class="tech-tags">
                <span class="tech-tag">Java</span>
                <span class="tech-tag">Android Studio</span>
                <span class="tech-tag">Firebase</span>
              </div>
            </a>

            <a href="https://github.com/YoussM21/3D-Solar-System" target="_blank" class="project-card">
              <div class="project-header">
                <span class="project-name">3D Solar System</span>
                <span class="project-arrow">↗</span>
              </div>
              <p class="project-desc">Low-poly solar system replica — my first Three.js project and the one that started the 3D obsession.</p>
              <div class="tech-tags">
                <span class="tech-tag">Three.js</span>
                <span class="tech-tag">WebGL</span>
              </div>
            </a>

            <a href="https://github.com/YoussM21/Sweat-giggles2.0" target="_blank" class="project-card">
              <div class="project-header">
                <span class="project-name">Sweat & Giggles</span>
                <span class="project-arrow">↗</span>
              </div>
              <p class="project-desc">Fitness booking site for personal trainers and gym classes. Clean UI, simple stack, does what it says.</p>
              <div class="tech-tags">
                <span class="tech-tag">HTML</span>
                <span class="tech-tag">CSS</span>
                <span class="tech-tag">JavaScript</span>
              </div>
            </a>

          </div>

          <div class="modal-footer">
            <div class="modal-footer-links">
              <a href="https://github.com/YoussM21" target="_blank" class="footer-link">
                <img src="../../assets/icons8-github-24.png" alt="GitHub"> See all on GitHub
              </a>
            </div>
          </div>
        `,
      },
    };
  }

  getModalInfo(portalName) {
    return this.modalContents[portalName];
  }
}
