document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.querySelector('.projects-grid');

  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent default navigation
      e.preventDefault();

      // Add fade effect
      const url = this.href;
      projectsGrid.classList.add('fading');

      // Navigate after fade
      setTimeout(() => {
        window.location.href = url;
      }, 300);
    });
  });
});

