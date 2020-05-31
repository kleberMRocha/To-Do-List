let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

let newBtn    = $('[data-form="0"]');
let MainModal = $('[data-form="1"]').children;

let modalTask = new Modal(newBtn,$('[data-form="1"]'),MainModal.close,MainModal[2].include,MainModal[2].reset);

