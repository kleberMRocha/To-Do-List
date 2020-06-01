let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

//modal
let newBtn    = $('[data-form="0"]');
let MainModal = $('[data-form="1"]').children;
let formTask  = $('.formTask');


//display
let displaytime = $('.relogio');
let taskList    = $('[data-task="1"]');
let sideMenu    = $('.sideMenu');
let msgArea     = $('.msg');
let taskCard    = $('.taskCard');

let taskDone = value =>{
    if([...value.classList].includes('btn-secondary')){
        value.classList.remove('btn-secondary');
        value.classList.add('btn-success');
    }else{
        value.classList.add('btn-secondary');
        value.classList.remove('btn-success');
    }
  
    
};


let modalTask = new Modal(newBtn,$('[data-form="1"]'),MainModal.close,
MainModal[2].include,MainModal[2].reset,formTask,msgArea);

let display = new Display(displaytime,taskList,sideMenu,taskCard);

