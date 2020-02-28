(function () {
  let nextBtns = Array.from(document.querySelectorAll('.next'));
  let prevBtns = Array.from(document.querySelectorAll('.prev'));
  let finishBtn = document.querySelector('.finish');
  let stepperForm = document.getElementById('stepper-form');
  let current_move = 0;
  const step_size = 333;

  nextBtns.forEach(function (el) {
    el.addEventListener('click', handleNextBtn)
  });

  prevBtns.forEach(function (el) {
    el.addEventListener('click', handlePrevBtn)
  });

  finishBtn.addEventListener('click', handleFinishBtn);

  function handleNextBtn(e) {
    e.preventDefault();
    const current_step = e.target.parentElement.parentElement.parentElement;
    const next_step = current_step.nextElementSibling;
    next_step.classList.add('active');
    current_step.classList.remove('active');
    current_move += -step_size;
    stepperForm.style.transform = 'translateX('+ current_move +'px)';
    return false;
  }

  function handlePrevBtn(e) {
    e.preventDefault();
    const current_step = e.target.parentElement.parentElement.parentElement;
    const next_step = current_step.previousElementSibling;
    next_step.classList.add('active');
    current_step.classList.remove('active');
    current_move += step_size;
    stepperForm.style.transform = 'translateX('+ current_move +'px)';
    return false;
  }

  function handleFinishBtn(e) {
    let current_step = this.parentElement.parentElement.parentElement;
    
    if(confirm('Are you sure to submit?')) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }
})();