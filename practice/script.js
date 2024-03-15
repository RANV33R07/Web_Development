window.addEventListener('scroll', function() {
  var sections = document.querySelectorAll('.pages');
  var navLinks = document.querySelectorAll('#navigation-right a');
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  sections.forEach(function(section, index) {
      var top = section.offsetTop - 100;
      var bottom = top + section.offsetHeight;

      // Check if the current scroll position is within the bounds of the current section
      if (scrollPosition >= top && scrollPosition < bottom) {
          // Remove 'active' class from all navigation links
          navLinks.forEach(function(navLink) {
              navLink.classList.remove('active');
          });
          // Add 'active' class to the corresponding navigation link
          navLinks[index].classList.add('active');
      }
  });
});
function showDetails(featureId, element) {
    var details = document.querySelectorAll('.details > div');
    var featureCards = document.querySelectorAll('.feature-card');
    
    details.forEach(function(detail) {
      detail.style.display = 'none';
    });
    featureCards.forEach(function(card) {
      card.classList.remove('active');
      card.textContent = card.textContent.replace('-', '+');
    });
    
    document.getElementById(featureId).style.display = 'block';
    element.classList.add('active');
    element.textContent = element.textContent.replace('+', '-');
  }