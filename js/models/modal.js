class Modal {
    constructor(newBtn,ModalBody,btnClose,btnInclude,btnReset,formTask,msgArea){
        
        this.newbtn = newBtn;
        this.body = ModalBody;
        this.btnClose = btnClose;
        this.btnInclude = btnInclude;
        this.btnReset = btnReset;
        this.formTask = formTask;
        this.msgArea = msgArea;
        this.start();
        
    }

    start(){
       this.closeModal();
       this.openModal();
       this.addTask();
     
    }


    //get informations from form
    get getTask(){

        let task = { 
            "task" : this.formTask.tarefa.value,
            "data" : this.formTask.data.value,
            "obs" : this.formTask.obs.value,
            "status": "p"
        }
    
        return task;
    
    }

    //send informations to objectStore
    addTask(){
        this.btnInclude.addEventListener("click", event =>{
            event.preventDefault();
            
            if(this.formTask.tarefa.value == "" || this.formTask.data.value   == ""){ 
                this.msrgDisplay(`<div class="alert-danger ">Por favor, informe a
                 data de entrega e o nome da tarefa</div>`,this.msgArea);
                return;
            }

           transaction(this.getTask);
           this.msrgDisplay(`<div class="alert-success p-1">Tarefa Adicionada !</di>`,this.msgArea);

        });

    }

    openModal(){
        this.newbtn.addEventListener("click",event =>{
            this.fadein();
        });

    }

    closeModal(){
        this.btnClose.addEventListener("click",event =>{
            this.fadeOut();
        });
    }

    fadeOut(){
        this.body.classList.remove('fadeIn');
        this.body.classList.add('fadeOut');
        setTimeout(()=>{this.body.classList.add('hide')},300);
    }

    fadein(){
        this.body.classList.remove('hide');
        this.body.classList.remove('fadeOut');
        this.body.classList.add('fadeIn');
    }

    msrgDisplay(value,target){
        target.innerHTML = value;
        setTimeout(()=>{
            target.innerHTML = "";  
        },3000);
        
    }
   
    
    
}