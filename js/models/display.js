class Display {

    constructor(displayTime,displayTask,sideMenu,taskCard,progress,progressPercent){
        this.displayTime = displayTime;
        this.dataTime = new Date(); 
        this.sideMenu = sideMenu;
        this.displayTask = displayTask;
        this.progress = progress;
        this.progressPercent = progressPercent;
        this.done = 0;
        this.getDataTIme();
        this.showAllTasks();
        this.totalTask(taskCard,progress,progressPercent);
              
    }

    getDataTIme(){

       this.setDataTime();
       setInterval(() => {
        this.setDataTime();
       },1000);
  
    }

    setDataTime(){
       this.dataTime = new Date();
       let data = this.dataTime.toLocaleDateString('pt-BR');
       let time = this.dataTime.toLocaleTimeString('pt-BR');
       this.displayTime.innerHTML = `<p>${data}<p/><p>${time}<p/>`;
    }

    //get all tasks on DB and append to the display
    showAllTasks(){  
           
            setInterval(()=>{
                cursor(this.displayTask);
            },1000); 
    }
    
    //update progress - check completed tasks
    totalTask(target01,target02,target03){
        
        setInterval(()=>{
            let done = 0;
            target01.innerHTML = `<h2><i class="fas fa-clipboard-check" aria-hidden="true"></i> :${ids.length}</h2>`;
            
            let status = $$('.status')
            
            status.forEach(element => {
                [...element.classList].includes("btn-success") && done++;
            });
             
             let progressP = parseFloat(((done/ids.length)*100).toFixed(1));
             
             target02.style = `width:${progressP}%`
            
             target03.innerHTML = `${progressP || 0}%`; 
             
             

        },500);

    }

    taskDone(value){
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

    deleteTask(value){
    
        ids = ids.filter(filter => filter != value.parentNode.children[2].innerHTML);
        deleteR(parseInt(value.parentNode.children[2].innerHTML));
        value.parentNode.children[0].classList.remove('btn-success');
        value.parentNode.parentNode.parentNode.style ="display:none"
    };


}