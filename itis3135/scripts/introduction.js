document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.getElementById("introForm");
    const coursesContainer = document.getElementById("courses-container");
    const addCourseBtn = document.getElementById("addCourseBtn");
    const clearButton = document.getElementById("clearBtn");
    const formContainer = document.getElementById("form-container");
    const resultContainer = document.getElementById("result-container");

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
            <input type="text" class="courseDept" placeholder="Dept" required>
            <input type="text" class="courseNum" placeholder="Number" required>
            <input type="text" class="courseName" placeholder="Name" required>
            <input type="text" class="courseReason" placeholder="Reason" required>
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

    function generateIntroduction() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const mascotAdj = document.getElementById("mascotAdj").value;
        const mascotAnimal = document.getElementById("mascotAnimal").value;
        const divider = document.getElementById("divider").value;

        const imageFile = document.getElementById("userImage").files[0];
        const defaultImage = document.getElementById("defaultImage").value;
        const imageUrl = imageFile ? URL.createObjectURL(imageFile) : defaultImage;
        const imageCaption = document.getElementById("imageCaption").value;

        let coursesHTML = "";
        document.querySelectorAll(".course-entry").forEach((entry) => {
            const dept = entry.querySelector(".courseDept").value;
            const num = entry.querySelector(".courseNum").value;
            const name = entry.querySelector(".courseName").value;
            const reason = entry.querySelector(".courseReason").value;
            coursesHTML += `<li><strong>${dept} ${num} - ${name}</strong>: ${reason}</li>`;
        });

        let linksHTML = "";
        document.querySelectorAll(".user-link").forEach((link, index) => {
            if (link.value) {
                linksHTML += `<li><a href="${link.value}" target="_blank">Link ${index + 1}</a></li>`;
            }
        });

        const resultHTML = `
            <h3>${firstName} ${lastName}'s ${mascotAdj} ${mascotAnimal}</h3>
            <p><strong>Divider:</strong> ${divider}</p>
            
            <figure>
                <img src="${imageUrl}" alt="${imageCaption}" style="max-width: 300px; border-radius: 8px;">
                <figcaption>${imageCaption}</figcaption>
            </figure>

            <p><strong>Personal Statement:</strong> ${document.getElementById("personalStatement").value}</p>

            <ul>
                <li><strong>Background:</strong> ${document.getElementById("bullet1").value}</li>
                <li><strong>Professional:</strong> ${document.getElementById("bullet2").value}</li>
                <li><strong>Academic:</strong> ${document.getElementById("bullet3").value}</li>
                <li><strong>Web Dev:</strong> ${document.getElementById("bullet4").value}</li>
                <li><strong>Platform:</strong> ${document.getElementById("bullet5").value}</li>
                <li><strong>Funny/Interesting:</strong> ${document.getElementById("bullet6").value}</li>
                <li><strong>Sharing:</strong> ${document.getElementById("bullet7").value}</li>
            </ul>

            <h4>Current Courses:</h4>
            <ul>${coursesHTML}</ul>

            <blockquote>
                "${document.getElementById("quoteText").value}" 
                <br>— <em>${document.getElementById("quoteAuthor").value}</em>
            </blockquote>

            <h4>Important Links</h4>
            <ul>${linksHTML}</ul>

            <p><em>Acknowledgment:</em> ${document.getElementById("ackStatement").value} (${document.getElementById("ackDate").value})</p>

            <hr>
            <a href="#" id="resetLink" style="display:inline-block; margin-top:20px;">Reset Progress and Form</a>
        `;

        formContainer.style.display = "none";
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
});