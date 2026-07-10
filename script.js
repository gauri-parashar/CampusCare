// Menu button (mobile nav toggle)
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Explore button - scroll to features
document.getElementById("exploreBtn").addEventListener("click", function () {
    document.getElementById("feature").scrollIntoView({
        behavior: "smooth"
    });
});

// Base URL of the CampusCare backend API (Project 2)
const API_BASE = "http://localhost:5000/api";

// Contact form - now sends real data to the backend instead of just alerting
const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("[name='name']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const subject = form.querySelector("[name='subject']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();

    if (name === "" || email === "" || subject === "" || message === "") {
        alert("Please fill all fields!");
        return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                form.reset();
            }
        })
        .catch(() => {
            alert("Could not reach the server. Make sure the backend is running (npm start).");
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Button ripple/press effect
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.style.transform = "scale(.95)";
        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 150);
    });
});

// Hide loader once page fully loads (single listener - duplicate removed)
window.addEventListener("load", () => {
    console.log("CampusCare Loaded Successfully");

    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

// Navbar shadow while scrolling
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    if (window.scrollY > 40) {
        nav.style.boxShadow = "0 4px 10px rgba(0,0,0,.2)";
    } else {
        nav.style.boxShadow = "none";
    }
});

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") == "#" + current) {
            link.classList.add("active");
        }
    });
});

// Fade-in animation for cards while scrolling
const hiddenEls = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

hiddenEls.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// Dark mode toggle
const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Load notices dynamically from the backend into the Notice Board section
function loadNotices() {
    const noticeList = document.getElementById("noticeList");
    if (!noticeList) return; // section not present on this page, skip safely

    noticeList.innerHTML = "<p>Loading notices...</p>";

    fetch(`${API_BASE}/notices`)
        .then(res => res.json())
        .then(data => {
            if (!data.success || data.data.length === 0) {
                noticeList.innerHTML = "<p>No notices available right now.</p>";
                return;
            }

            noticeList.innerHTML = data.data
                .map(notice => `
                    <div class="card notice-card">
                        <h3>${notice.title}</h3>
                        <p>${notice.content}</p>
                        <span class="notice-date">${notice.date}</span>
                    </div>
                `)
                .join("");
        })
        .catch(() => {
            noticeList.innerHTML = "<p>Could not load notices. Is the backend server running?</p>";
        });
}

loadNotices();

// Faculty "View Profile" button placeholder
const facultyButtons = document.querySelectorAll("#faculty .card button");

facultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        alert("👨‍🏫 Faculty Profile feature will be available in the next version.");
    });
});
