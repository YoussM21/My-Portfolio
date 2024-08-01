

export default class ModelContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        title: `<h3 class="title">Hi, I'm Youssef!</h3>`,
        description:`
          <div class="about-me-container">
            <img src="../../assets/ReadyPlayerMe-Avatar 1.svg" alt="avatar Pic" class="avatar-pic">
            <div class="about-me-content">
              <p>I'm a 4th year Software Engineering student at the University of Ottawa. By day, I'm a developer, and by night, I'm a soccer player. I've had multiple internships in both the private and public sectors, where I've honed my skills and gained valuable experience. As a fast learner and hardworking individual, I'm always seeking new challenges and opportunities to learn. I'm passionate about web development and have recently been diving into game development. I thrive in fast-paced environments and am committed to delivering high-quality, scalable solutions. An enthusiastic team player, I'm ready to contribute to company success. Thanks for visiting!</p>
            </div>
          </div>
        `,
      },
      myexperience: {
        title: '<h3 style="padding: 0 ; margin: 0;">My Experience</h3>',
        description: `
                    <div class="experience-container">
                        <div class="left-column">
                            <img src="../../assets/low-poly-office.svg" alt="office" class="office-pic">
                            <p class="introduction">
                            As a 4th year Software Engineering student at the University of Ottawa, I've gained valuable experience through multiple internships in both the private and public sectors. Outside of work, I dedicate a lot of my free time to learning new coding languages and exploring data science. I excel in team environments but also enjoy working on solo projects. Learn more about my projects by visiting the projects section of this site.<strong> Click on the icon to view my full resume.</strong>
                            </p>
                            <div class="social-icons">
                                <a href="https://www.linkedin.com/in/youssefmroue/" target="_blank">
                                    <img src="../../assets/icons8-linkedin-24.png" alt="LinkedIn" class="social-icon">
                                </a>
                                <a href="https://github.com/YoussM21" target="_blank">
                                    <img src="../../assets/icons8-github-24.png" alt="GitHub" class="social-icon">
                                </a>
                                <a href="mailto:mroueh.youssef10@gmail.com" target="_blank">
                                    <img src="../../assets/icons8-mail-24.png" alt="Mail" class="social-icon">
                                </a>
                                <a href="https://youssef-mroue-resume.tiiny.site" target="_blank">
                                    <img src="../../assets/icons8-resume-24.png" alt="Resume" class="social-icon">
                                </a>
                            </div>
                        </div>
                        <div class="right-column">
                            <div class="experience">
                            <h3>Transport Canada</h3>
                            <p class="position">Application Developer/Agile Scrum Master</p>
                            <p>Developed custom applications using Microsoft Power Apps and led Agile processes as Scrum Master</p>

                            <h3>Statistics Canada</h3>
                            <p class="position">Data Scientist/Junior Analyst</p>
                            <p>Analyzed large datasets using Python and R, created visualizations, and collaborated on predictive modeling</p>

                            <h3>Sliike Corporation</h3>
                            <p class="position">UI/UX Designer & Junior Website Developer</p>
                            <p>Designed and developed interfaces for websites and mobile apps, worked with new frameworks in an Agile environment</p>
                            </div>
                        </div>
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
