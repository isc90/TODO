import { LitElement, html, css } from 'lit';

export class MyTodo extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
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
        this.tasks = [];
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
        this.requestUpdate();    
        };
        this.titleInput.value="";
        this.descInput.value = "";
        console.log(this.tasks)
    };

    render() {
        return html`
            
            <div>
                <div class="controllers">
                <h2>Add a new task</h2>

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

                <div class="task-list">
                </div>
            </div>
        `;
    }
}
customElements.define('my-todo', MyTodo);
