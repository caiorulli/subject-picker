window.addEventListener('DOMContentLoaded', function () {
  const iconsToggle = document.querySelectorAll('[data-toggle]')

  iconsToggle.forEach((it) => {
    it.addEventListener('click', (e) => {
      const togglebox = e.target.parentElement.parentElement
      if (togglebox.classList.contains('active')) {
        togglebox.classList.remove('active')
      } else {
        togglebox.classList.add('active')
      }
    })
  })
}, false)

function goToList() {
  var value = document.getElementById('ra').value;
  window.location.assign('/choose/' + value);
}
