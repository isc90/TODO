import { LitElement, html, css } from 'lit';

export class MyTodo extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
             
           .subheader{
            margin-left: 1em;
           }

            .container{
                padding: 0 0 1em 0;
            }


            .task-list{
                margin-top: 1em;
            }
            .task-container{
                background-color:#29293d;
                opacity: 75%;
                border-radius: 10px;
                padding: 0.25em 0.5em 0.25em 0.5em;
                margin: 0.5em;
            }
            
            
            .task-title{
                margin: 0.5em 0 0.5em 0;
                opacity:100%;
            }

            hr{
                margin: 0 0.5em 0 0.5em;
            }

            .form-container{
                display:flex;
                justify-content: space-between;
            }

            .data-form{
                margin: 1em 0 1em 1em;
            }
            
            .add-button{
                margin: 0.5em 0 1em 0;
                background-color: #0047b3;
                
                border:none;
                border-radius: 0.25em;
            }

            
            .action-button-container{
                margin: 1em 1em 1em 0;
            }

            button{
                margin: 0.5em 0 1em 0; 
                padding:0.5em;
                border:none;
                border-radius: 0.25em;
                margin: 0.5em 0 1em 0;
            }
            
            #delete-button{
                background-color: #e60000;
            }

            #pending-button{
                background-color: #fcac17;
            }
            
            #completed-button{
                background-color: #00cc00;
            }


            .task-title-container{
            
                display:flex;
                justify-content:space-between;
            }

            .complete-box{
                padding: 1em 1em 0 0;
            }
                
            .action-button-container-mobile{
                display: none;
            }

            .task-container {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.task-container[completed] {
  opacity: 0.6;
}

.task-container[completed] .title,
.task-container[completed] .description {
  text-decoration: line-through;
  color: #888;
}


            @media(max-width:480px){

               

                .controllers{
                    text-align:center;
                    margin: 1em 0 0 0;
                    
                }

                button{
            
                padding:1.5em;
                border-radius: 0.25em;
                width: 100%;
            }
                .title, .description{
                    margin-left: 0.5em;
                }  

            .subheader{
                text-align: center;
                margin: 0 0 0 0;
            }

            #delete-button, #pending-button,#completed-button{
                display:none;
            }

            
            .form-container{
                justify-content:center;
            }
            

            .data-form{
                display: flex;
                flex-direction: column;
                width:100%;
                margin:1em;
            }

           

            .task-title, .task-desc{
                padding:1em;
            }

            .add-button{
                border:none;
                border-radius: 0.25em;
                
            }

            #delete-button-mobile{
                background-color: #e60000;
            }

            #pending-button-mobile{
                background-color: #fcac17;
            }

            #completed-button-mobile{
                background-color: #00cc00;
            }


            .action-button-container-mobile{
                display: flex;
                flex-direction:column;
                padding:1em;
            }

            .action-button-container{
                margin:0;
                padding:0;
            }
                
    }
        `
    ];

    

    static properties = {
        tasks : {type:Array},
        newTask : {type:Object},
        filtered: {type:Array}
    };

    firstUpdated(){
         this.titleInput = this.renderRoot.querySelector(".task-title");
         this.descInput = this.renderRoot.querySelector(".task-desc")
    };

    constructor(){
        super();
        const savedTasks = localStorage.getItem('tasks');
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
        this.newTask = {
            title:'',
            description:'',
            completed:false
        };
        this.filtered = [...this.tasks]
    };

    _handleSubmit(e){
        e.preventDefault();
        if(this.newTask.title.trim()){
            this.tasks = [...this.tasks,{...this.newTask}
            ];
        this.newTask = {title:'',description:'',completed:false};
        localStorage.setItem('tasks', JSON.stringify(this.tasks));    
        this.requestUpdate();    
        };
        this.titleInput.value="";
        this.descInput.value = "";
        console.log(this.tasks)
        this.filtered = [...this.tasks];


    };

    _toggleTask(task){
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.requestUpdate();
        console.log(task)    
       
    }

    _wipeList(){

        if(confirm("Do you wish to wipe your to-do list?")){
             localStorage.clear();
        this.tasks = [];
        this.requestUpdate();
        };
    };

    _pendingTasks(){
         this.filtered = this.tasks.filter((task) => task.completed == false);
    }

    _completedTasks(){
        this.filtered = this.tasks.filter((task) => task.completed);
    }

    render() {
        return html`
            <hr>
            <div class="container">
                <div class="controllers">

                <div class="subheader">
                    <h2>Add a new task</h2>
                </div>
                
                <hr>
                <div class="form-container">
                <form @submit=${this._handleSubmit} class="data-form">
                
                    <input class="task-title" placeholder="Task title" .value=${this.newTask.title}
                    @input=${(e)=> this.newTask.title = e.target.value}
                    >
                    <input class="task-desc" placeholder="Task description" .value=${this.newTask.description}
                    @input=${(e)=> this.newTask.description = e.target.value}
                    >
                    <button class="add-button" type="submit">Add Task</button>
                    
                

                    
                </form>

                 <div class="action-button-container">
                    <button id="completed-button" @click=${this._completedTasks}>Show completed</button>
                    <button id="pending-button" @click=${this._pendingTasks}>Show pending</button>
                    
                    <button id="delete-button" @click=${this._wipeList}>Wipe To-Do list</button>
                </div>
                </div>
               
                </div>
                <hr>
                <div class="task-list">
                    ${this.filtered.map(task => html`
                            <div class="task-container" ?completed=${task.completed ? 'completed' : ''}>
                                    
                                    <div class="task-title-container">
                                        <div>
                                            <h3 class="title">${task.title}</h3>
                                        </div>

                                        <div class="complete-box">
                                            <label for="complete">Task complete</label>
                                            <input type="checkbox" id="complete" .checked$={task.completed} @change=${()=> this._toggleTask(task)}>
                                        </div>
                                    </div>
                                
                                <hr>
                                <p class="description">${task.description}</p>
                            </div>
                        `)}
                </div>

                <div class="action-button-container-mobile">
                    <button id="completed-button-mobile" @click=${this._completedTasks}>Show completed</button>
                    <button id="pending-button-mobile" @click=${this._pendingTasks}>Show pending</button>
                    <button id="delete-button-mobile" @click=${this._wipeList}>Wipe To-Do list</button>
                </div>
            </div>
        `;
    }
}
customElements.define('my-todo', MyTodo);
