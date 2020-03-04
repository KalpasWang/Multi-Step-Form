(function () {
  // buttons
  let nextBtns = Array.from(document.querySelectorAll('.next'));
  let prevBtns = Array.from(document.querySelectorAll('.prev'));
  let finishBtn = document.querySelector('.finish');
  
  let stepperForm = document.getElementById('stepper-form');
  
  // input field
  let username = document.getElementById('username');
  let password = document.getElementById('password');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let address = document.getElementById('address');
  
  // current step
  let current_move = 0;
  
  // the distance of pixels form this form to next/prev form 
  const step_size = 333;


  // buttons click event
  nextBtns.forEach(function (el) {
    el.addEventListener('click', handleNextBtn)
  });

  prevBtns.forEach(function (el) {
    el.addEventListener('click', handlePrevBtn)
  });

  finishBtn.addEventListener('click', handleFinishBtn);



  // remove error alert when typing
  username.addEventListener('input', e => removeErrorMsg(e.target));
  password.addEventListener('input', e => removeErrorMsg(e.target));
  email.addEventListener('input', e => removeErrorMsg(e.target));
  phone.addEventListener('input', e => removeErrorMsg(e.target));
  address.addEventListener('input', e => removeErrorMsg(e.target));

  function removeErrorMsg(el) {
    el.classList.remove('is-invalid');
    el.nextElementSibling.textContent = '';
    el.nextElementSibling.classList.remove('invalid-feedback');
  }

  // validate html constraint
  function validate(items) {
    let validated = true;
    items.forEach(el => {
      if(!el.checkValidity()) {
        el.classList.add('is-invalid');
        el.nextElementSibling.classList.add('invalid-feedback');
        if(el.validity.valueMissing) {
          el.nextElementSibling.textContent = `${el.id} can not be empty`;
        } else if(el.validity.typeMismatch) {
          el.nextElementSibling.textContent = `please input valid ${el.id}`;
        } else {
          el.nextElementSibling.textContent = 'unknown error';
        }
        validated = false;
      }
      else {
        el.classList.remove('is-invalid');
      }
    });
    
    return validated;
  }
  
  
  
  
  // when clicking next button on current form, check validation and move to next step
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


  // move to previous step when click prev button
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
  
  
  
  // check validation and show success message, then reload the page
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