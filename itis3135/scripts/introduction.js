document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.getElementById("introForm");
    const coursesContainer = document.getElementById("courses-container");
    const addCourseBtn = document.getElementById("addCourseBtn");
    const clearButton = document.getElementById("clearBtn");
    const formContainer = document.getElementById("form-container");
    const resultContainer = document.getElementById("result-container");
    
    const btnGenHtml = document.getElementById("btnGenHtml");
    const btnGenJson = document.getElementById("btnGenJson");
    const btnGenXml = document.getElementById("btnGenXml");
    const codeOutputContainer = document.getElementById("code-output-container");
    const codeTextarea = document.getElementById("code-textarea");

    document.getElementById("ackDate").value = new Date().toISOString().split('T')[0];

    clearButton.addEventListener("click", function () {
        const inputs = Array.from(document.querySelectorAll("form input, form textarea"));
        inputs.forEach((input) => {
            if (input.type !== "submit" && input.type !== "reset" && input.type !== "button") {
                input.value = "";
            }
        });
    });

    function attachDeleteEvent(button) {
        button.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        });
    }

    addCourseBtn.addEventListener("click", () => {
        const courseDiv = document.createElement("div");
        courseDiv.className = "course-entry";
        
        courseDiv.innerHTML = `
            <input type="text" class="courseDept" aria-labelledby="lbl-dept" placeholder="Dept" required>
            <input type="text" class="courseNum" aria-labelledby="lbl-num" placeholder="Number" required>
            <input type="text" class="courseName" aria-labelledby="lbl-name" placeholder="Name" required>
            <input type="text" class="courseReason" aria-labelledby="lbl-reason" placeholder="Reason" required>
            <button type="button" class="delete-btn">Delete</button>
        `;
        
        coursesContainer.appendChild(courseDiv);
        attachDeleteEvent(courseDiv.querySelector(".delete-btn"));
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
        if (!btn.disabled) {
            attachDeleteEvent(btn);
        }
    });

    function getFormData() {
        const courses = [];
        document.querySelectorAll(".course-entry").forEach((entry) => {
            courses.push({
                dept: entry.querySelector(".courseDept").value,
                num: entry.querySelector(".courseNum").value,
                name: entry.querySelector(".courseName").value,
                reason: entry.querySelector(".courseReason").value
            });
        });

        const linkLabels = ["CLT Webpage", "GitHub", "LinkedIn", "freeCodeCamp", "Codecademy"];
        const links = [];
        document.querySelectorAll(".user-link").forEach((link, index) => {
            if (link.value) {
                links.push({
                    url: link.value,
                    label: linkLabels[index] || `Link ${index + 1}`
                });
            }
        });

        const imageFile = document.getElementById("userImage").files[0];
        const defaultImage = document.getElementById("defaultImage").value;
        const imageUrl = imageFile ? URL.createObjectURL(imageFile) : defaultImage;

        return {
            firstName: document.getElementById("firstName").value,
            middleName: document.getElementById("middleName").value,
            nickName: document.getElementById("nickName").value,
            lastName: document.getElementById("lastName").value,
            mascotAdj: document.getElementById("mascotAdj").value,
            mascotAnimal: document.getElementById("mascotAnimal").value,
            divider: document.getElementById("divider").value,
            imageUrl: imageUrl,
            imageCaption: document.getElementById("imageCaption").value,
            personalStatement: document.getElementById("personalStatement").value,
            bullets: [
                document.getElementById("bullet1").value,
                document.getElementById("bullet2").value,
                document.getElementById("bullet3").value,
                document.getElementById("bullet4").value,
                document.getElementById("bullet5").value,
                document.getElementById("bullet6").value,
                document.getElementById("bullet7").value
            ],
            courses: courses,
            quoteText: document.getElementById("quoteText").value,
            quoteAuthor: document.getElementById("quoteAuthor").value,
            funnyThing: document.getElementById("funnyThing").value,
            links: links,
            ackStatement: document.getElementById("ackStatement").value,
            ackDate: document.getElementById("ackDate").value
        };
    }

    // Helper: Build the introduction HTML string
    function buildHTMLString(data) {
        let coursesHTML = "";
        data.courses.forEach((course) => {
            coursesHTML += `<li><strong>${course.dept} ${course.num} - ${course.name}</strong>: ${course.reason}</li>\n                `;
        });

        let linksHTML = "";
        data.links.forEach((linkObj) => {
            linksHTML += `<li><a href="${linkObj.url}" target="_blank">${linkObj.label}</a></li>\n                `;
        });

        return `
            <h3>${data.firstName} ${data.lastName}'s ${data.mascotAdj} ${data.mascotAnimal}</h3>
            <p><strong>Divider:</strong> ${data.divider}</p>
            
            <figure>
                <img src="${data.imageUrl}" alt="${data.imageCaption}" style="max-width: 300px; border-radius: 8px;">
                <figcaption>${data.imageCaption}</figcaption>
            </figure>

            <p><strong>Personal Statement:</strong> ${data.personalStatement}</p>

            <ul>
                <li><strong>Background:</strong> ${data.bullets[0]}</li>
                <li><strong>Professional:</strong> ${data.bullets[1]}</li>
                <li><strong>Academic:</strong> ${data.bullets[2]}</li>
                <li><strong>Web Dev:</strong> ${data.bullets[3]}</li>
                <li><strong>Platform:</strong> ${data.bullets[4]}</li>
                <li><strong>Funny/Interesting:</strong> ${data.bullets[5]}</li>
                <li><strong>Sharing:</strong> ${data.bullets[6]}</li>
            </ul>

            <h4>Current Courses:</h4>
            <ul>
                ${coursesHTML.trim()}
            </ul>

            <blockquote>
                "${data.quoteText}" 
                <br>— <em>${data.quoteAuthor}</em>
            </blockquote>

            <h4>Important Links</h4>
            <ul>
                ${linksHTML.trim()}
            </ul>

            <p><em>Acknowledgment:</em> ${data.ackStatement} (${data.ackDate})</p>
        `;
    }

    function generateIntroduction() {
        const data = getFormData();
        const resultHTML = buildHTMLString(data) + `\n            <hr>\n            <a href="#" id="resetLink" style="display:inline-block; margin-top:20px;">Reset Progress and Form</a>`;

        formContainer.style.display = "none";
        codeOutputContainer.style.display = "none";
        resultContainer.innerHTML = resultHTML;
        resultContainer.style.display = "block";

        document.getElementById("resetLink").addEventListener("click", (e) => {
            e.preventDefault();
            resultContainer.style.display = "none";
            formContainer.style.display = "block";
            formElement.reset(); 
        });
    }

    formElement.addEventListener("submit", (e) => {
        e.preventDefault(); 
        if (!formElement.checkValidity()) {
            formElement.reportValidity();
            return;
        }
        generateIntroduction();
    });

    function showCode(codeString) {
        codeTextarea.value = codeString;
        codeOutputContainer.style.display = "block";
        resultContainer.style.display = "none"; // Hide rendered intro if open
    }

    btnGenHtml.addEventListener("click", () => {
        if (!formElement.checkValidity()) { formElement.reportValidity(); return; }
        const data = getFormData();
        // Remove trailing spaces and extra indents for cleaner code viewing
        const cleanHTML = buildHTMLString(data).replace(/^\s{12}/gm, '');
        showCode(cleanHTML);
    });

    btnGenJson.addEventListener("click", () => {
        if (!formElement.checkValidity()) { formElement.reportValidity(); return; }
        const data = getFormData();
        showCode(JSON.stringify(data, null, 4));
    });

    btnGenXml.addEventListener("click", () => {
        if (!formElement.checkValidity()) { formElement.reportValidity(); return; }
        const data = getFormData();
        
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<introduction>\n`;
        xml += `  <personalInfo>\n`;
        xml += `    <firstName>${data.firstName}</firstName>\n`;
        xml += `    <middleName>${data.middleName}</middleName>\n`;
        xml += `    <nickName>${data.nickName}</nickName>\n`;
        xml += `    <lastName>${data.lastName}</lastName>\n`;
        xml += `  </personalInfo>\n`;
        
        xml += `  <brand>\n`;
        xml += `    <mascotAdj>${data.mascotAdj}</mascotAdj>\n`;
        xml += `    <mascotAnimal>${data.mascotAnimal}</mascotAnimal>\n`;
        xml += `    <divider>${data.divider}</divider>\n`;
        xml += `    <imageCaption>${data.imageCaption}</imageCaption>\n`;
        xml += `  </brand>\n`;
        
        xml += `  <background>\n`;
        xml += `    <personalStatement>${data.personalStatement}</personalStatement>\n`;
        data.bullets.forEach((bullet, idx) => {
            xml += `    <bullet index="${idx + 1}">${bullet}</bullet>\n`;
        });
        xml += `  </background>\n`;

        xml += `  <courses>\n`;
        data.courses.forEach((c) => {
            xml += `    <course>\n`;
            xml += `      <dept>${c.dept}</dept>\n`;
            xml += `      <num>${c.num}</num>\n`;
            xml += `      <name>${c.name}</name>\n`;
            xml += `      <reason>${c.reason}</reason>\n`;
            xml += `    </course>\n`;
        });
        xml += `  </courses>\n`;

        xml += `  <extras>\n`;
        xml += `    <quote>\n      <text>${data.quoteText}</text>\n      <author>${data.quoteAuthor}</author>\n    </quote>\n`;
        if (data.funnyThing) {
            xml += `    <funnyThing>${data.funnyThing}</funnyThing>\n`;
        }
        
        xml += `    <links>\n`;
        data.links.forEach((linkObj) => {
            xml += `      <link>\n`;
            xml += `        <label>${linkObj.label}</label>\n`;
            xml += `        <url>${linkObj.url}</url>\n`;
            xml += `      </link>\n`;
        });
        xml += `    </links>\n`;
        xml += `  </extras>\n`;
        
        xml += `  <acknowledgment>\n`;
        xml += `    <statement>${data.ackStatement}</statement>\n`;
        xml += `    <date>${data.ackDate}</date>\n`;
        xml += `  </acknowledgment>\n`;
        
        xml += `</introduction>`;
        
        showCode(xml);
    });
});