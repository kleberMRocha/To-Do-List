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
let progress    = $('.progress-bar');
let progressP   = $('.taskProgress');
let clear       = $('.clearS');

let taskDone = value =>{
    if([...value.classList].includes('btn-secondary')){
        value.classList.remove('btn-secondary');
        value.classList.add('btn-success');
        update(parseInt(value.parentNode.children[2].innerHTML))
        
    }else{
        value.classList.add('btn-secondary');
        value.classList.remove('btn-success');
        update(parseInt(value.parentNode.children[2].innerHTML))
    }
  
    
};

let deleteTask = value =>{

    ids = ids.filter(filter => filter != value.parentNode.children[2].innerHTML);
    deleteR(parseInt(value.parentNode.children[2].innerHTML));
    value.parentNode.children[0].classList.remove('btn-success');
    value.parentNode.parentNode.parentNode.style ="display:none"
}

let modalTask = new Modal(newBtn,$('[data-form="1"]'),MainModal.close,
MainModal[2].include,MainModal[2].reset,formTask,msgArea,clear);

let display = new Display(displaytime,taskList,sideMenu,taskCard,progress,progressP);

