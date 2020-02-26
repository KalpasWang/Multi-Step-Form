(function () {
  let nextBtns = Array.from(document.querySelectorAll('.next'));
  let prevBtns = Array.from(document.querySelectorAll('.prev'));
  let finishBtn = document.querySelector('.finish');
  let stepperForm = document.getElementById('stepper-form');

  nextBtns.forEach(function (el) {
    el.addEventListener('click', handleNextBtn)
  });

  prevBtns.forEach(function (el) {
    el.addEventListener('click', handlePrevBtn)
  });

  finishBtn.addEventListener('click', handleFinishBtn);

  function handleNextBtn(e) {
    let current_step = e.tatget.parentElement.parentElement.parentElement;
    let next_step = current_step.nextElementSibiling;
    console.log(current_step);
    console.log(next_step);
    next_step.classList.add('active');
    current_step.classList.remove('active');

  }

  function handlePrevBtn(e) {
    let current_step = this.parentElement.parentElement.parentElement;
    console.log(this);
  }

  function handleFinishBtn(e) {
    let current_step = this.parentElement.parentElement.parentElement;
    console.log(this);
  }
})()