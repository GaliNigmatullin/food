import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector,modalTimerId) {
     //forms отправка

     const forms = document.querySelectorAll(formSelector);

     const message = {
         loading: 'img/form/spinner.svg',
         success: 'Спасибо! Скоро свяжемся',
         failure: 'что то не так'
     };
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
     
 
     function bindPostData(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault();
 
             const statusMessage = document.createElement('img');
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
             
             form.insertAdjacentElement('afterend', statusMessage);
 
            
             // request.setRequestHeader('Content-type', 'application/json');
             const formData = new FormData(form); // что бы работала проверить тег name у инпута он должен быть
             
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
 
 
 
             //const json = JSON.stringify(object);
            
             postData('http://localhost:3000/requests',json)
             .then(data => {
                 console.log(data);
                 showThanksModal(message.success);
                 form.reset();
                 statusMessage.remove();
             }).catch(() => {
                 showThanksModal(message.failure);
             }).finally(() => {
                 form.reset();
             });
 
            // отправка через http request 
             //request.send(json);
 
             // request.addEventListener('load', () => {
             //     if (request.status === 200) {
             //         console.log(request.response);
             //         showThanksModal(message.success);
             //         form.reset();
             //         statusMessage.remove();
             //     } else {
             //         showThanksModal(message.failure);
             //     }
             // });
         });
     }
 
     function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');
 
         prevModalDialog.classList.add('hide');
         openModal('.modal', modalTimerId);
 
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
             <div class="modal__content">
                 <div class="modal__close" data-close>×</div>
                 <div class="modal__title">${message}</div>       
             </div>
         `;
 
         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hide');
             closeModal('.modal');
         }, 4000);
     }
}

export default forms;