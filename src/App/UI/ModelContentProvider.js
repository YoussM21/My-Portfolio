

export default class ModelContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        title: '',
        description: `
          <div class="about-header">
            <div class="about-intro">
              <h3 class="section-title">Hi, I'm Youssef.</h3>
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
        title: '',
        description: `
          <h3 class="section-title">Experience</h3>
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
        title: '<h3 style=" padding: 0; margin: 0;"> My Projects</h3>',
        description: `
              <div class="projects-container">
                <img src="../../assets/low-poly-computer.png" alt="computer Pic" class="computer-pic">
                <div class="projects-content">
                    <ul>
                        <li><strong><a href="https://github.com/YoussM21/Sweat-giggles2.0" target="_blank" style="text-decoration: none; color: #3ec4c4;">Sweat & Giggles:</a></strong> 
                        A front-end website that allows users to book personal trainers and gym classes. Built using basic HTML, CSS, and JavaScript, this project showcases my ability to create interactive and user-friendly web interfaces.</li>
                        <li><strong><a href="https://github.com/YoussM21/stellarquest" target="_blank" style="text-decoration: none; color: #3ec4c4;">StellarQuest:</a></strong> 
                        This front-end website enables users to book tickets to different planets. It also features a "Picture of the Day" section, where users can select a specific date to view a NASA photo along with its description. Developed using React.js, this project highlights my proficiency in modern web development frameworks.</li>
                        <li><strong><a href="https://github.com/YoussM21/Mealer-App" target="_blank" style="text-decoration: none; color: #3ec4c4;">Mealer:</a></strong> 
                        An Android app that connects users with small business home chefs for food orders. Created with Android Studio and Java, this project demonstrates my skills in mobile app development and my understanding of user-centric design.</li>
                        <li><strong><a href="https://github.com/YoussM21/innfinity" target="_blank" style="text-decoration: none; color: #3ec4c4;">Innfinity:</a></strong> 
                        A full-stack website allowing users to book hotel rooms with specific customizations. It includes a fully functional database managed with PostgreSQL and pgAdmin, a React frontend, and an ExpressJS backend. This project illustrates my competence in building complete, scalable web applications from scratch.</li>
                        <li><strong><a href="https://github.com/YoussM21/3D-Solar-System" target="_blank" style="text-decoration: none; color: #3ec4c4;">3D Solar System:</a></strong>
                        My first venture into ThreeJS, where I developed a low poly replica of the solar system. This project represents my interest and growing expertise in 3D graphics and game development.</li>
                    </ul>
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
