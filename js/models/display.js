class Display {
    constructor(displayTime,displayTask,sideMenu,taskCard){
        this.displayTime = displayTime;
        this.dataTime = new Date(); 
        this.sideMenu = sideMenu;
        this.displayTask = displayTask;
        this.getDataTIme();
        this.showAllTasks();
        this.totalTask(taskCard);

        
        
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

    msrgDisplay(value,target){
        target.appendChild(value);
        
    }
    
    showAllTasks(){
        
            //get all tasks on DB and append to the display
            setInterval(()=>{
                cursor(this.displayTask);
            },1000);
       
    }
    
    totalTask(target){

        setInterval(()=>{
            target.innerHTML = `<h2>Tarefas : ${ids.length}</h2>`;
        },500);

    }


}