class Task {
    constructor(){

    }
    deleteTask(value,self){
        if(confirm(`Excluir tarefa #${value}?`)){
            ids = ids.filter(filter => filter != value);
            deleteR(parseInt(value));
            self.parentNode.children[0].classList.remove('btn-success');
            self.parentNode.parentNode.parentNode.style ="display:none"
        } 
       
    };

    taskDone(value,self){
        if([...self.classList].includes('btn-secondary')){
            self.classList.remove('btn-secondary');
            self.classList.add('btn-success');
            update(parseInt(value))
            
        }else{
            self.classList.add('btn-secondary');
            self.classList.remove('btn-success');
            update(parseInt(value))
        }
      
        
    };

    editTask(value){
        updateT(value);
    }

    
}

