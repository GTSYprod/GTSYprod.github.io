document.addEventListener("DOMContentLoaded", load);

//Load page content and functions
function load() {

    //Brings down navigation bar
    dropDown();

    //Hide errors on page load
    hideErrors();

    //Style arrows
    arrowStyle();

    //Add event listener to the form reset button
    document.getElementById("contactForm").addEventListener("reset", resetForm);

    //Add event listener to the form submit button
    document.getElementById("contactForm").addEventListener("submit", validate);

    $(document).ready(function(){
        // Add scroll functionality for navigation links
        $(".navLink").on("click", function(e) {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
            
            // Get the target section from the href attribute
            const target = $(this).attr("href");
            let scrollTarget;
            
            // Determine which section to scroll to based on the link
            switch(target) {
                case "home":
                    scrollTarget = $("#heroContent");
                    break;
                case "about":
                    scrollTarget = $("#aboutPage");
                    break;
                case "skills":
                    scrollTarget = $("#skillPage");
                    break;
                case "contact":
                    scrollTarget = $("#contactPage");
                    break;
                default:
                    return;
            }
            
            // Close dropdown menu
            $("#dropDown").removeClass("show");
            

            setTimeout(function() {

                const headerHeight = $("#topBar").outerHeight();
                const targetPosition = scrollTarget.offset().top;
                
                // Adjust offset based on the specific section
                let scrollOffset;
                
                // Different offsets for different sections to account for their specific styling
                switch(target) {
                    case "home":
                        scrollOffset = targetPosition - headerHeight - 200;
                        break;
                    case "about":
                        scrollOffset = targetPosition - headerHeight;
                        break;
                    case "skills":
                        scrollOffset = targetPosition - headerHeight;
                        break;
                    case "contact":
                        scrollOffset = targetPosition - headerHeight;
                        break;
                    default:
                        scrollOffset = targetPosition - headerHeight;
                }
                
                // Temporarily disable CSS smooth scrolling
                $("html").css("scroll-behavior", "auto");
                
                // Perform scroll with proper easing
                $("html, body").animate({
                    scrollTop: scrollOffset
                }, {
                    duration: 800,
                    easing: "easeInOutQuad", 
                    complete: function() {
                        // Re-enable CSS smooth scrolling
                        $("html").css("scroll-behavior", "smooth");
                    }
                });
            }, 50);
        });

        // Logo scroll to top 
        $(".gtsyLogo, .gtsy").on("click", function(e) {
            e.preventDefault();
            
            // Temporarily disable CSS smooth scrolling
            $("html").css("scroll-behavior", "auto");
            
            // Scroll to top
            $("html, body").animate({
                scrollTop: 0
            }, {
                duration: 800,
                easing: "easeInOutQuad", 
                complete: function() {
                    // Re-enable CSS smooth scrolling
                    $("html").css("scroll-behavior", "smooth");
                }
            });
        });
    })   
}

function resetForm(e) {

    e.preventDefault();
    const inputs = document.querySelectorAll("#contactForm input, #contactForm textarea");

    inputs.forEach(input => {
        input.value = "";
    });

    hideErrors();

    if (inputs.length > 0) {
        inputs[0].focus()
    }
}

function validate(e) {

    hideErrors();

    if (formHasErrors()) {
        e.preventDefault();
        return false;
    }
    return true;
}

function hideErrors() {

    let error = document.getElementsByClassName("error");

    for (let i = 0; i < error.length; i++) {
        error[i].style.display = "none";
    }
}

function formFieldHasInput(fieldElement) {

    if (fieldElement.value == null || fieldElement.value.trim() == "") {
        return false;
    }
    return true;
}

function validateInput() {

    const requiredFields = ["fullname","email","phonenumber","subject","message"];

    for (let i = 0; i<requiredFields.length; i++) {
        let inputField = document.getElementById(requiredFields[i]);
        if(!formFieldHasInput(inputField)) {
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            inputField.focus();
            inputField.select();

            return false;
        }
    }

    return true;
}

function validateEmailFormat() {

    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	const email = document.getElementById("email");
	const emailValue = email.value;

	if(emailValue.trim() && !emailRegex.test(emailValue)) {
		document.getElementById("emailformat_error").style.display = "block";

		email.focus();
        email.select();

		return false;
	}

	return true;
}

function validatePhoneFormat() {

    const phoneRegex = new RegExp(/^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
    const phone = document.getElementById("phonenumber");
    const phoneValue = phone.value;

    if(phoneValue.trim() && !phoneRegex.test(phoneValue)) {
        document.getElementById("phoneformat_error").style.display = "block";

        phone.focus();
        phone.select();

        return false;
    }

    return true;
}

function formHasErrors() {

    if(!validateEmailFormat()) return true;
    if(!validatePhoneFormat()) return true;
    if(!validateInput()) return true;

    return false;
}

function dropDown() {

    const toggleButton = document.getElementById("chevron");
    const dropDown = document.getElementById("dropDown");

    toggleButton.addEventListener("click", () => {
        dropDown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!dropDown.contains(e.target) && !toggleButton.contains(e.target)) {
            dropDown.classList.remove("show");
        }
    });
}

function arrowStyle() {

    const targets = document.querySelectorAll(".arrow");
    targets.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add("odd");
        }
        if (index === 1) {
            el.classList.add("even");
        }
    });
}