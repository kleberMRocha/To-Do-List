window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.indexedDB || alert("Sem suporte ao recurso IndexedDB");

let db;
let ids = [];



/* Open indexedDB */
let request = window.indexedDB.open("toDoList",1);

request.onupgradeneeded = event => {
    console.log("Banco Com Sucesso");
    db = event.target.result;
    let store = db.createObjectStore("toDotask",{ keyPath : "id", autoIncrement:true});
};

request.onsuccess = event =>{ 
     db = event.target.result;
     console.log("Sucesso!");
    
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
                            <li>${cursor.value.task}</li>
                            <li> | ${new Date(cursor.value.data).toLocaleDateString('pt-BR')}
                                   ${new Date(cursor.value.data).toLocaleTimeString('pt-BR')} |
                            </li>
                            <li>${cursor.value.obs}</li>
                        </ul>
                        <div class="btn-toolbar ml-auto " role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" onclick="taskDone(this)"class="btn btn-success btnG"><i class="fas fa-check"></i></button>
                            <button type="button" onclick="taskDone(this)"class="btn btn-danger btnG"><i class="fas fa-times"></i></button>
                        </div>
                </div>
            `
            }else{
                task = `
                <div class="task">
                        <ul>
                            <li>${cursor.value.task}</li>
                            <li> | ${new Date(cursor.value.data).toLocaleDateString('pt-BR')}
                                   ${new Date(cursor.value.data).toLocaleTimeString('pt-BR')} |
                            </li>
                            <li>${cursor.value.obs}</li>
                        </ul>
                        <div class="btn-toolbar ml-auto " role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" onclick="taskDone(this)"class="btn btn-secondary btnG"><i class="fas fa-check"></i></button>
                            <button type="button" onclick="taskDone(this)"class="btn btn-danger btnG"><i class="fas fa-times"></i></button>
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

}



