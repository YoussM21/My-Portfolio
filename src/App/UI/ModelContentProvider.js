export default class ModelContentProvider {
    constructor() {
        this.modalContents = {
            aboutMe: {
                title: "About me",
                description: "This is a simple modal window that is created using JavaScript."
            },
            contactMe: {
                title: "Contact me",
                description: "You can contact us at"
            },
            projects: {
                title: "Projects",
                description: "These are the projects that I have worked on."
            }
        }
    }

    getModalInfo(portalName) {
        return this.modalContents[portalName];
    }
}