class Modal {
    constructor(newBtn,modalBody,btnClose,btnInclude,btnReset,formTask,msgArea,clearBtn){
        
        this.newbtn = newBtn;
        this.body = modalBody;
        this.btnClose = btnClose;
        this.btnInclude = btnInclude;
        this.btnReset = btnReset;
        this.clearStoreBtn = clearBtn;
        this.formTask = formTask;
        this.msgArea = msgArea;
        this.start();
        
    }

    start(){
       this.closeModal();
       this.openModal();
       this.addTask();
       this.clearStore();
     
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
            
            if(new Date(this.formTask.data.value) == "Invalid Date"){
                this.msrgDisplay(`<div class="alert-danger ">Por favor, informe uma
                data valida</div>`,this.msgArea);
                return;
            }

            if(this.formTask.tarefa.value == "" || this.formTask.data.value   == ""){ 
                this.msrgDisplay(`<div class="alert-danger ">Por favor, informe a
                 data de entrega e o nome da tarefa</div>`,this.msgArea);
                return;
            }

           transaction(this.getTask);
           this.msrgDisplay(`<div class="alert-success p-1">Tarefa Adicionada !</di>`,this.msgArea);

        });

    }

    clearStore(){
       this.clearStoreBtn.addEventListener("click",event =>{
            clearStore();
       });
    }

    openModal(){
        this.newbtn.addEventListener("click",event =>{
            this.fadein();
            this.formTask.edit.style = "display:none";
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