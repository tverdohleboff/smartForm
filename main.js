import './style.css'

function submitMainForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formEntries = Object.fromEntries(formData);
  console.log(formEntries);
}

const mainForm = document.querySelector('#mainForm');
mainForm.addEventListener('submit', submitMainForm);

function handleLabelClick(event) {
  const label = event.target;
  label.classList.add('main-form__label_active'); 
  const input = label.nextElementSibling;
  input.classList.add('main-form__input_active');
}
const mainFormLabels = document.querySelectorAll(".main-form__label");
mainFormLabels.forEach(function(label){
  label.addEventListener('click', handleLabelClick);
})

function handleInputFocus(event) {
  const input = event.target;
  const label = input.previousElementSibling;
  label.classList.add('main-form__label_active'); 
  input.classList.add('main-form__input_active');
}

function containsNumbers(str) {
  return /[0-9]/.test(str);
}

function validateInput(input) {
  const feedbackDiv = input.parentNode.querySelector('.feedback');

    if(input.value && input.value.length < 2) {

      input.classList.add('is-invalid');
      
      if(feedbackDiv) {
        feedbackDiv.classList.remove('valid-feedback');
        feedbackDiv.classList.add('invalid-feedback');
        feedbackDiv.innerText = 'Фамилия должна быть длиннее 1 символа';
      } else {
        const feedback = document.createElement('div');
        feedback.classList.add('feedback', 'invalid-feedback');
        feedback.innerText = 'Фамилия должна быть длиннее 1 символа';
        input.parentNode.append(feedback);
      }
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if(feedbackDiv) {
        feedbackDiv.classList.remove('invalid-feedback');
        feedbackDiv.classList.add('valid-feedback');
        feedbackDiv.innerText = 'Теперь всё хорошо';
      }
    }
  
}

function handleInputBlur(event) {
  const input = event.target;
  const label = input.previousElementSibling;
  validateInput(input);

  if(input.value) {
    label.classList.add('main-form__label_has-value');
    input.classList.add('main-form__input_has-value');
  } else {
    label.classList.remove('main-form__label_active'); 
    input.classList.remove('main-form__input_active');
  }
}

function handleInputInput(event) {
  const input = event.target;
  const label = input.previousElementSibling;
  if(input.name === 'firstName' || input.name === 'lastName') {
    if(containsNumbers(input.value)) {
      input.value = input.value.slice(0, -1);
    }
  }

  validateInput(input);
  if(!input.value) {
    input.classList.remove('main-form__input_has-value');
    label.classList.remove('main-form__label_has-value');
  }
}

const mainFormInputs = document.querySelectorAll(".main-form__input");
mainFormInputs.forEach(function(input){
  input.addEventListener('focus', handleInputFocus);
  input.addEventListener('blur', handleInputBlur);
  input.addEventListener('input', handleInputInput);
})


