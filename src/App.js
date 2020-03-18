import React from 'react';
import './App.css';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            todos: JSON.parse(localStorage.getItem('todos')) === null ? [] : JSON.parse(localStorage.getItem('todos')),
            count: parseInt(localStorage.getItem('count') == null ? 0 : localStorage.getItem('count')),
            checkList: [],
        };
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    getTodos = () => {
        let todos = this.state.todos;

        return [
            ...todos.filter(t => !t.completed),
            ...todos.filter(t => !!t.completed)
        ];
    };

    addTodo(e) {
        let inputValue = e;
        this.setState((prevState, props) => {

            let todoList = prevState.todos;
            const newTodo = {
                id: prevState.count + 1,
                title: inputValue,
                completed: false,
            };

            todoList.push(newTodo);

            localStorage.setItem('todos', JSON.stringify(todoList));

            localStorage.setItem('count', (prevState.count + 1).toString());

            return {
                //[...prevState.todos, newTodo]
                todos: todoList,
                count: prevState.count + 1,
                checkList: [prevState.checkList, false]

            };

        });


    }

    deleteTodo(id) {
        this.setState((prevState, props) => {
                let newTodos = prevState.todos;

                newTodos.splice(newTodos.indexOf(newTodos.find(todo => todo.id === id)), 1);

                console.log("csc");
                localStorage.setItem('todos', JSON.stringify(newTodos));

                localStorage.setItem('count', (prevState.count - 1).toString());
                return {todos: newTodos}

            }
        );
    }


    addCheck = (id) => {
        console.log("alpha");
        this.setState((prevState, props) => {
            let checks = prevState.todos;
            const todo = checks.find(todo => todo.id === id);

            todo.completed = !todo.completed;

            console.log(checks.find(todo => todo.id === id).completed);
            localStorage.setItem('todos', JSON.stringify(checks));

            return {todos: checks};
        });
    };

    render() {
        return (
            <div className={"main-content"}>

                <TitleField addTodo={this.addTodo.bind(this)}/>

                {this.getTodos().map((todo, index) => {
                        console.log("value " + todo.completed);
                        return <div key={todo.id.toString()}>

                            <TextWithCheck todo={todo} deleteTodo={() => {
                                this.deleteTodo(todo.id)
                            }}
                                           isCheck={todo.completed}

                                           addCheck={() => this.addCheck(todo.id)}

                            />

                        </div>;
                    }
                )}
            </div>
        );
    }
}

class TitleField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {txt: ''};
    }

    update(e) {
        this.setState({txt: e.target.value})
    }

    clearField = () => {

        console.log('dfghj');

        this.setState({
            txt: ""
        });
    };

    render() {
        return (<div className={"titleField"}>

            <input type="text" placeholder="Enter the Title for your Todo" value={this.state.txt}
                   onChange={this.update.bind(this)}/>

            <Button actionPerform={() => {
                this.props.addTodo(this.state.txt);
                this.clearField();

            }} text={"add"}/>

        </div>);

    }

}


const TextWithCheck = (props) => <div className="textWithCheck">
    <input type="checkbox" onChange={props.addCheck} checked={props.isCheck}></input>
    <h3>{props.todo.title}</h3>
    <Button actionPerform={props.deleteTodo} text={"delete"}/>
</div>;


const Button = (props) => <button className={"titleField-button"} onClick={props.actionPerform}>{props.text}</button>


export default App;

