// LOAD DATA FROM JSON FILE

document.addEventListener("DOMContentLoaded", loadPortfolio);

async function loadPortfolio() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to fetch JSON data");
        }

        const data = await response.json();

        // Display all portfolio information
        displayPersonalDetails(data.personal);
        displayAbout(data.about, data.personal);
        displaySkills(data.skills);
        displayProjects(data.projects);
        displayEducation(data.education);
        displayCertifications(data.certifications, data.achievements);
        displaySocialLinks(data.social);

        // Hide loading and show website
        document.getElementById("loading").classList.add("d-none");

        document.getElementById("portfolioContent")
            .classList.remove("d-none");

    }

    catch (error) {

        console.error("Error:", error);

        document.getElementById("loading").classList.add("d-none");

        document.getElementById("errorMessage").classList.remove("d-none");

    }

}


// PERSONAL DETAILS

function displayPersonalDetails(personal) {

    document.getElementById("logo").textContent =
        personal.name.split(" ")[0];

    document.getElementById("studentName").textContent =
        personal.name;

    document.getElementById("studentRole").textContent =
        personal.role;

    document.getElementById("introduction").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("resumeLink").href =
        personal.resume;

    document.getElementById("emailInfo").textContent =
        personal.email;

    document.getElementById("phoneInfo").textContent =
        personal.phone;

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("copyright").textContent =
        "© " + new Date().getFullYear() + " " +
        personal.name + ". All Rights Reserved.";

}


// ABOUT DETAILS

function displayAbout(about, personal) {

    document.getElementById("aboutDescription").textContent =
        about.description;

    document.getElementById("courseInfo").textContent =
        personal.role;

}


// SKILLS

function displaySkills(skills) {

    const container = document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const skillCard = `

            <div class="col-md-6 col-lg-4">

                <div class="skill-card">

                    <i class="bi ${skill.icon} skill-icon"></i>

                    <h5>${skill.name}</h5>

                    <p>${skill.level}%</p>

                    <div class="skill-level">

                        <div class="skill-progress"
                            style="width: ${skill.level}%">
                        </div>

                    </div>

                </div>

            </div>

        `;

        container.innerHTML += skillCard;

    });

}


// PROJECTS

function displayProjects(projects) {

    const container = document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(project => {

        const technologies = project.technologies.map(tech => {

            return `<span class="tech-badge">${tech}</span>`;

        }).join("");

        const projectCard = `

            <div class="col-md-6 col-lg-4">

                <div class="project-card">

                    <img src="${project.image}"
                        alt="${project.name}"
                        loading="lazy">

                    <div class="project-content">

                        <h5>${project.name}</h5>

                        <p>${project.description}</p>

                        <div>
                            ${technologies}
                        </div>

                        <a href="${project.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-link">

                            View Project
                            <i class="bi bi-arrow-right"></i>

                        </a>

                    </div>

                </div>

            </div>

        `;

        container.innerHTML += projectCard;

    });

}


// EDUCATION

function displayEducation(education) {

    const container = document.getElementById("educationContainer");

    container.innerHTML = `

        <div class="education-card">

            <h4>${education.course}</h4>

            <h5>${education.college}</h5>

            <p>
                <strong>Academic Year:</strong>
                ${education.academicYear}
            </p>

            <p>
                <strong>Year:</strong>
                ${education.year}
            </p>

            <p>
                <strong>Semester:</strong>
                ${education.semester}
            </p>

            <p>
                <strong>Status:</strong>
                ${education.status}
            </p>

        </div>

    `;

}


// CERTIFICATIONS AND ACHIEVEMENTS

function displayCertifications(certifications, achievements) {

    const container = document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(certificate => {

        const certificateCard = `

            <div class="col-md-6 col-lg-4">

                <div class="certificate-card">

                    <i class="bi bi-award-fill"></i>

                    <h5>${certificate.name}</h5>

                    <p>${certificate.organization}</p>

                    <p>${certificate.description}</p>

                    <small>Year: ${certificate.year}</small>

                </div>

            </div>

        `;

        container.innerHTML += certificateCard;

    });


    // Display achievements

    const achievementHTML = achievements.map(item => {

        return `<li class="mb-2">${item}</li>`;

    }).join("");

    container.innerHTML += `

        <div class="col-12">

            <div class="certificate-card">

                <h5>
                    <i class="bi bi-trophy-fill"></i>
                    My Achievements
                </h5>

                <ul class="mt-3">
                    ${achievementHTML}
                </ul>

            </div>

        </div>

    `;

}


// SOCIAL MEDIA LINKS

function displaySocialLinks(social) {

    const container = document.getElementById("socialLinks");

    container.innerHTML = `

        <a href="${social.github}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub">

            <i class="bi bi-github"></i>

        </a>

        <a href="${social.linkedin}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn">

            <i class="bi bi-linkedin"></i>

        </a>

        <a href="${social.instagram}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram">

            <i class="bi bi-instagram"></i>

        </a>

    `;

}


// CONTACT FORM VALIDATION

document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();

    const email = document.getElementById("contactEmail").value.trim();

    const subject = document.getElementById("contactSubject").value.trim();

    const message = document.getElementById("contactMessage").value.trim();

    const formMessage = document.getElementById("formMessage");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!name || !email || !subject || !message) {

        formMessage.textContent = "Please fill in all fields.";

        formMessage.style.color = "red";

        return;

    }


    if (!emailPattern.test(email)) {

        formMessage.textContent = "Please enter a valid email address.";

        formMessage.style.color = "red";

        return;

    }


    if (message.length < 10) {

        formMessage.textContent = "Message must contain at least 10 characters.";

        formMessage.style.color = "red";

        return;

    }


    formMessage.textContent =
        "Your form is valid! Connect a backend or email service to send your message.";

    formMessage.style.color = "green";

    document.getElementById("contactForm").reset();

});