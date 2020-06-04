window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.indexedDB || alert("Sem suporte ao recurso IndexedDB");

let db;
//this array prevents duplicate values from being added to the view
let ids = []; // 

/* Open indexedDB */
let request = window.indexedDB.open("toDoList",1);

request.onupgradeneeded = event => {
    console.log("Banco Com Sucesso");
    db = event.target.result;
    let store = db.createObjectStore("toDotask",{ keyPath : "id", autoIncrement:true});
};

request.onsuccess = event =>{ 
     db = event.target.result;
   
    
}

request.onerror = event => console.log("Erro ao abrir o banco de dados");

/* transaction */
let transaction = value => {

       let transaction = db.transaction(["toDotask"],"readwrite");
       transaction.oncomplete = event => {console.log("transaction : seucesso")};
       transaction.onerror    = event => {console.log("transaction : erro")};
   
       let store = transaction.objectStore("toDotask");
       store.add(value);
}

/*cursor*/

let cursor = (target) => {

    let transaction = db.transaction(['toDotask'], "readonly");
    let store = transaction.objectStore('toDotask');

    store.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        
        if(cursor) {
            let task;
            
            //add task to display
            if(cursor.value.status != "p"){
                task = `
                <div class="task">
                        <ul>
                            <li class="id">ID:#${cursor.value.id} </li>
                            <li>${cursor.value.task}</li>
                            <li> ${new Date(cursor.value.data).toLocaleDateString('pt-BR')} -
                                 ${new Date(cursor.value.data).toLocaleTimeString('pt-BR')} 
                            </li>
                            <li>${cursor.value.obs}</li>
                        </ul>
                        <div class="btn-toolbar ml-auto " role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" onclick="newTask.taskDone(${cursor.value.id},this)"class="btn btn-success btnG status"><i class="fas fa-check"></i></button>
                            <button type="button" onclick="newTask.editTask(${cursor.value.id},this)"class="btn btn-warning btnG"><i class="fas fa-edit"></i></button>
                            <button type="button" onclick="newTask.deleteTask(${cursor.value.id},this)"class="btn btn-danger btnG"><i class="fas fa-times"></i></button>
                        </div>
                </div>
            `
            }else{
                task = `
                <div class="task">
                        <ul>
                            <li class="id">ID:#${cursor.value.id} </li>
                            <li>${cursor.value.task}</li>
                            <li> ${new Date(cursor.value.data).toLocaleDateString('pt-BR')} -
                            ${new Date(cursor.value.data).toLocaleTimeString('pt-BR')} 
                            </li>
                            <li>${cursor.value.obs}</li>
                        </ul>
                        <div class="btn-toolbar ml-auto " role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" onclick="newTask.taskDone(${cursor.value.id},this)"class="btn btn-secondary btnG status"><i class="fas fa-check"></i></button>
                            <button type="button" onclick="newTask.editTask(${cursor.value.id},this)"class="btn btn-warning btnG"><i class="fas fa-edit"></i></button>
                            <button type="button" onclick="newTask.deleteTask(${cursor.value.id},this)"class="btn btn-danger btnG"><i class="fas fa-times"></i></button>
                        </div>
                </div>
             `
            }
           
            let divT = document.createElement('div');
            if(!ids.includes(cursor.value.id)){

                divT.innerHTML = task;
                target.appendChild(divT);

                //create an array with ids
                let id = cursor.value.id;
                ids.push(id);
            }

            cursor.continue();
        }
      };

};

/*Update Status*/
let update = (id) =>{ 

    let transaction = db.transaction(["toDotask"],"readwrite");
    let store = transaction.objectStore("toDotask");
    var request = store.get(id);
    request.onerror = (event) =>{ console.log('Erro');};
    request.onsuccess = (event) => {
        
        let data = request.result;
        data.status == "d" ? data.status = "p" : data.status = "d";
       
        let updateRequest = store.put(data);

        updateRequest.onerror = (event) =>{
            console.log(event);
        };

        updateRequest.onsuccess = (event) =>{
         
        };

    };

};

/*Update Task*/
let updateT = (id) =>{ 

    let transaction = db.transaction(["toDotask"],"readwrite");
    let store = transaction.objectStore("toDotask");
    var request = store.get(id);
    request.onerror = (event) =>{ console.log('Erro');};
    request.onsuccess = (event) => {
        
        let data = request.result;
        
        console.log(data);

        modalTask.fadein();

        modalTask.formTask.tarefa.value = data.task;
        modalTask.formTask.data.value = data.data;
        modalTask.formTask.obs.value = data.obs;
        modalTask.formTask.edit.style = "";

        modalTask.formTask.edit.addEventListener("click",event =>{
            event.preventDefault();
            if(new Date(modalTask.formTask.data.value) == "Invalid Date"){
                modalTask.msrgDisplay(`<div class="alert-danger ">Por favor, informe uma
                data valida</div>`,modalTask.msgArea);
                return;
            }
            let transaction = db.transaction(["toDotask"],"readwrite");
            let store = transaction.objectStore("toDotask");

            request.onerror = (event) =>{ console.log('Erro');};
            request.onsuccess = (event) => {console.log('sucesso');}

            data.task = modalTask.formTask.tarefa.value;
            data.data = modalTask.formTask.data.value;
            data.obs =  modalTask.formTask.obs.value;

            if(confirm('alterar os dados?')){

                let updateRequest = store.put(data);
                updateRequest.onerror = (event) =>{
                    console.log(event);
                };
                updateRequest.onsuccess = (event) =>{
                    console.log('seucesso');
                    modalTask.formTask.edit.style = "display:none";
                    location.reload(true);
                   };
        
            }
         
        });
       
       
    };

};


/*delete*/
let deleteR = (id) =>{ 

    let transaction = db.transaction(["toDotask"],"readwrite");
    let store = transaction.objectStore("toDotask");

    var request = store.get(id);

    request.onerror = (event) => {
        console.log('Erro');
    };
 
        let dropRequest = store.delete(id);

        dropRequest.onerror = (event) =>{
            
            console.log(event);
        };
        
        dropRequest.onsuccess = (event) => {
            
        };
        
            
};

/*Clear Obj store*/
let clearStore = () =>{

     let transaction = db.transaction(["toDotask"], "readwrite");
     transaction.oncomplete = (event)=>{console.log('sucesso');};
     transaction.onerror    = (event)=>{console.log('erro');};

     let objectStore = transaction.objectStore("toDotask");
     let objectStoreRequest = objectStore.clear();
     objectStoreRequest.onsuccess = function(event) {
         ids = [];
         let tasks = $$('.task')
         tasks.forEach(element => element.remove());

     };

}