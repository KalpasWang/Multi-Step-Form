(function () {
  let nextBtns = Array.from(document.querySelectorAll('.next'));
  let prevBtns = Array.from(document.querySelectorAll('.prev'));
  let finishBtn = document.querySelector('.finish');
  let stepperForm = document.getElementById('stepper-form');
  let username = document.getElementById('username');
  let password = document.getElementById('password');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let address = document.getElementById('address');
  let current_move = 0;
  const step_size = 333;

  nextBtns.forEach(function (el) {
    el.addEventListener('click', handleNextBtn)
  });

  prevBtns.forEach(function (el) {
    el.addEventListener('click', handlePrevBtn)
  });

  finishBtn.addEventListener('click', handleFinishBtn);

  function validate(items) {
    let validated = true;
    items.forEach(el => {
      if(!el.checkValidity()) {
        el.classList.add('is-invalid');
        validated = false;
      }
      else {
        el.classList.remove('is-invalid');
      }
    });
    
    return validated;
  }

  function handleNextBtn(e) {
    e.preventDefault();
    const current_step = e.target.parentElement.parentElement.parentElement;
    const next_step = current_step.nextElementSibling;

    let isOK = false;
    
    switch(current_step.id) {
      case 'fieldset1':
        isOK = validate([username, password]);
        break;
      case 'fieldset2':
        isOK = validate([email]);
        break;
      default :
    }
    
    if(!isOK) return false;
    
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
    const isOK = validate([phone, address]);
    if(!isOK) {
      e.preventDefault();
      return false;
    }
    if(confirm('Are you sure to submit?')) {
      location.reload();
      setTimeout(alert('Submit Successfully!'), 1000);
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }
})();