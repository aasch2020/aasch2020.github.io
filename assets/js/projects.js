document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.querySelector('.projects-grid');

  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent navigation initially
      e.preventDefault();

      // Add fading effect to other cards
      projectsGrid.classList.add('fading');
      this.classList.add('active');

      // Wait for animation to complete before navigating
      setTimeout(() => {
        window.location.href = this.href;
      }, 500);
    });
  });
});
