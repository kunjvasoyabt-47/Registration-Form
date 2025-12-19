// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser")
  const sheetURL = "https://script.google.com/macros/s/AKfycbzQGob7UisqmpIR982wYaA_LwdFy3Kb88lOQg0xeeAauJxNMsKj1cAfinh9Ko1foSkP4g/exec";


  if (!currentUser) {
    window.location.href = "login.html"
    return
  }


const mailClick = document.getElementById("mail-click");

    if (mailClick) {
        mailClick.addEventListener("click", () => {
            const email = "kunjvasoya03@gmail.com";
            const subject = "Contact from Portfolio";
            const body = "Hello Kunj,";

            const gmailUrl =
                `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.open(gmailUrl, "_blank");
        });
    }

 const phoneClick = document.getElementById("phone-click");

    if (phoneClick) {
        phoneClick.addEventListener("click", () => {
            const phone = "916353710257"; // country code without +

            const whatsappUrl =
                `https://wa.me/${phone}?text=${encodeURIComponent("Hello Kunj, I visited your portfolio!")}`;

            window.open(whatsappUrl, "_blank");
        });
    }

   
    const locationClick = document.getElementById("location-click");

    if (locationClick) {
        locationClick.addEventListener("click", () => {
            const location = "305, Zodiac Square, Sarkhej - Gandhinagar Hwy, Bodakdev, Ahmedabad, Gujarat 380054";

            const mapsUrl =
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

            window.open(mapsUrl, "_blank");
        });
    }



  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Logout functionality
  const logoutBtn = document.getElementById("logoutBtn")
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser")
    window.location.href = "login.html"
  })

  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const messageInput = document.getElementById("message")

  const nameError = document.getElementById("nameError")
  const emailError = document.getElementById("emailError")
  const messageError = document.getElementById("messageError")

  nameInput.addEventListener("input", () => {

    const name = nameInput.value.trim();

    if(!isValidUsername(name)  && (name.length < 2 || name.length > 30)) {
      nameError.innerText = "Name must be at least 2 characters and max 30 characters with no spaces or numbers";
      nameInput.style.border = "1px solid red";
    } else {
      nameError.innerText = "";
      nameInput.style.border = "1.2px solid green";
    }

  });

  emailInput.addEventListener("input", () => { 
    const email = emailInput.value.trim();
    if (!isValidEmail(email)) {
      emailError.innerText = "Enter a valid business email (no Gmail/Yahoo/Outlook)";
      emailInput.style.border = "1px solid red";
    } else {
      emailError.innerText = "";
      emailInput.style.border = "1.2px solid green";
    }
   });

   messageInput.addEventListener("input", () => {

    const message = messageInput.value.trim();
    if(message.length < 10  || message.length > 200) {
      messageError.innerText = "Message must be at least 10 characters & max 200 characters";
      messageInput.style.border = "1px solid red";
    } else {
      messageError.innerText = "";
      messageInput.style.border = "1.2px solid green";
    }   
   });


  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
 
    const isValid =nameError.innerText === "" &&
                        emailError.innerText === "" &&
                        messageError.innerText === "";
    if(!isValid) {
        alert(" Please fix all errors before submitting");
        return;
    }

        const contactData = {
            type: "contact",
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };

        showLoader();
   
        requestAnimationFrame(() => {
            setTimeout(() => {
                hideLoader();
            }, 4000);
        });

        fetch(sheetURL, {
            method: "POST",
            body: JSON.stringify(contactData)
        })
        .then(res => res.text())
        .then(result => {
            if (result === "success") {
                alert("Message sent successfully");
                form.reset();
            } else {
                alert(" Something went wrong");
            }
        });


  });
})


