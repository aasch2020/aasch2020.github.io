document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent navigation initially
      e.preventDefault();

      // Add zooming effect to image
      this.classList.add('zooming');

      // Wait for animation to complete before navigating
      setTimeout(() => {
        window.location.href = this.href;
      }, 600);
    });
  });
});
