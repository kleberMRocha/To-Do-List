//shortcuts
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

//modal
let newBtn    = $('[data-form="0"]');
let modalBody = $('[data-form="1"]');
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

let modalTask = new Modal(newBtn,modalBody,MainModal.close,
MainModal[2].include,MainModal[2].reset,formTask,msgArea,clear);

let display = new Display(displaytime,taskList,sideMenu,taskCard,progress,progressP);

let newTask = new Task();

