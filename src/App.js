import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '',error: null,isLoaded: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      // var jsondata = JSON.parse(data);
      // var json = require('./task.json'); 
      // this.setState({items:json.items});
      // console.debug(json);
    let newTasks = localStorage.tasks
     if(newTasks !== undefined){
         this.setState({
             items: JSON.parse(newTasks)
         });
     }
  }

  render() {
    let completed = this.state.items.filter( function (item) {
      return item.mark === true
    });

    let pending = this.state.items.filter( function (item) {
      return item.mark !== true
    });

    return (
      <div className='Task-container'>
        <form onSubmit={this.handleSubmit}>
        <div className='Task-title'>
          <label>Reminders</label>
          <button className='Task-btn-add'>+</button>
          <hr/>
        </div>  
          <label htmlFor="new-todo">
            What needs to be done?
          </label>

          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
            />
           
            <div className="Task-completed-container">
            <span className="Task-completed-count">{completed.length}</span>
            <label className="Task-completed-title">Completed</label>
            <span className="Task-btn-collapse" onClick={(e) => this.collapseOnClicked(e)}>></span>
            <div className="completed-list">
            <ul id="todoListCompleted" className="Todo-list-container hide">
            {completed.map(item => ( 
              <li key={item.id}>{item.text}</li>
              ))}
            </ul>
            </div>
            </div>
           
            <ul className="Todo-list-container">
            {pending.map(item => (
              <li key={item.id}>
              <input type="checkbox" defaultChecked={item.mark} onClick={(e) => this.handleCheckboxClicked(e,item)} 
              className="Todo-list-inline-checkbox"/>{item.text}
              <span className="Task-btn-remove" onClick={(e) => this.removeTask(e,item)}>x</span></li>
              ))}
            </ul>
            </form>
          </div>
    );
  }

  collapseOnClicked(e){
    var listbox = document.getElementById('todoListCompleted');
    listbox.classList.toggle('hide');
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const task = {
      text: this.state.text,
      mark: false,
      id: Date.now()
    };

   let newTasks = this.state.items.concat([task]);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    this.setState({
        items: newTasks,
        text:''
    });
  }

   handleCheckboxClicked(e,item) {
    item.mark = !item.mark;
    var li = e.target.parentElement;
    li.classList.toggle('mark');
    localStorage.setItem('tasks', JSON.stringify(this.state.items));
  }

  removeTask(e,item) {
    var index = this.state.items.indexOf(item);
    console.debug(this.state.items);

    this.setState(function(prevState){
      return { items : prevState.items.filter(function(val, i) {
        return i !== index;
      })};
    });
    setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(this.state.items));
    },100)

    // item.mark = !item.mark;
    // var li = e.target.parentElement;
    // li.classList.toggle('mark');
    //  localStorage.setItem('tasks', JSON.stringify(this.props.items));
  }

}


//class TodoList extends React.Component {

  // handleCheckboxClicked(e,item) {
  //   item.mark = !item.mark;
  //   var li = e.target.parentElement;
  //   li.classList.toggle('mark');
  //    localStorage.setItem('tasks', JSON.stringify(this.props.items));
  // }

  //  removeTask(e,item) {
  //   var index = this.props.items.indexOf(item);

  //   console.debug(index);
  //   this.props.items.splice(index,1);
  //   // this.props.items.filter((_, i) => i !== index)

  //   // item.mark = !item.mark;
  //   // var li = e.target.parentElement;
  //   // li.classList.toggle('mark');
  //   //  localStorage.setItem('tasks', JSON.stringify(this.props.items));
  // }

  //render() {
    //return (
      /*<ul className="Todo-list-container">
        {this.props.items.map(item => (
          item.mark?
          <li key={item.id} className="mark">
          <input type="checkbox" defaultChecked={item.mark} onClick={(e) => this.handleCheckboxClicked(e,item)} 
          className="Todo-list-inline-checkbox"/>{item.text}
          <span className="Task-btn-remove" onClick={(e) => this.removeTask(e,item)}>x</span></li>
          :
          <li key={item.id}>
          <input type="checkbox" defaultChecked={item.mark} onClick={(e) => this.handleCheckboxClicked(e,item)} 
          className="Todo-list-inline-checkbox"/>{item.text}
          <span className="Task-btn-remove" onClick={(e) => this.removeTask(e,item)}>x</span></li>
        ))}
      </ul>*/
    //);
  //}
//}

export default App;
