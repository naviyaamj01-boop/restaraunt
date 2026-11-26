// Filter menu cards by the selected category.
const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", isActive);
    });

    menuCards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

// Keep a simple running count of the items added to the cart.
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const cartMessage = document.querySelector(".cart-message");
let itemCount = 0;

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    cartCount.textContent = itemCount;
    cartButton.setAttribute("aria-label", `Shopping cart, ${itemCount} items`);
    cartMessage.textContent = `${button.dataset.name} added to your cart.`;
  });
});

// Toggle the navigation links on smaller screens.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Let the browser check required fields, email format, and minimum lengths.
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector(".form-feedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formFeedback.classList.remove("error");

  if (!contactForm.reportValidity()) {
    formFeedback.textContent = "Please check the highlighted fields and try again.";
    formFeedback.classList.add("error");
    return;
  }

  const name = contactForm.elements.name.value.trim();
  formFeedback.textContent = `Thanks, ${name}! Your message is ready. We'll be in touch soon.`;
  contactForm.reset();
});
