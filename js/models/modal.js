class Modal {
    constructor(newBtn,ModalBody,btnClose,btnInclude,btnReset){
        
        this.newbtn = newBtn;
        this.body = ModalBody;
        this.btnClose = btnClose;
        this.btnInclude = btnInclude;
        this.btnReset = btnReset;
        this.start();
        
    }

    start(){
       this.closeModal();
       this.openModal();
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
    
    
}