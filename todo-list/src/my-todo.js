import { LitElement, html, css } from 'lit';

export class MyTodo extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
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
            
            .add-button{
                margin: 0.5em 0 1em 0;
                background-color: #0047b3;
                padding:0.5em;
                border:none;
                border-radius: 0.25em;
            }

            @media(max-width:480px){
                .controllers{
                    text-align:center;
                }

                .add-button{
            
                padding:1.5em;
                border-radius: 0.25em;
                width: 75%;
            }
  
            }
        `
    ];

    

    static properties = {
        tasks : {type:Array},
        newTask : {type:Object}
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
            description:''
        };
    };

    _handleSubmit(e){
        e.preventDefault();
        if(this.newTask.title.trim()){
            this.tasks = [...this.tasks,{...this.newTask}
            ];
        this.newTask = {title:'',description:''};
        localStorage.setItem('tasks', JSON.stringify(this.tasks));    
        this.requestUpdate();    
        };
        this.titleInput.value="";
        this.descInput.value = "";
        console.log(this.tasks)


    };

    render() {
        return html`
            <hr>
            <div>
                <div class="controllers">
                <h2>Add a new task</h2>
                <hr>
                <form @submit=${this._handleSubmit}>
                    <input class="task-title" placeholder="Task title" .value=${this.newTask.title}
                    @input=${(e)=> this.newTask.title = e.target.value}
                    >
                    <input class="task-desc" placeholder="Task description" .value=${this.newTask.description}
                    @input=${(e)=> this.newTask.description = e.target.value}
                    >
                    <button class="add-button" type="submit">Add Task</button>
                </form>
                    
                </div>
                <hr>
                <div class="task-list">
                    ${this.tasks.map(task => html`
                            <div class="task-container">
                                <h3>${task.title}</h3>
                                <p>${task.description}</p>
                            </div>
                        `)}
                </div>
            </div>
        `;
    }
}
customElements.define('my-todo', MyTodo);
