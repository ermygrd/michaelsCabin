import React, {
    Component
} from 'react';
import logo from './logo.svg';
import {
    Navbar,
    Jumbotron,
    Button
} from 'react-bootstrap';
import './App.css';

class CommentBox extends Component {
  constructor(){
    super();
    this.state={
      showComments: false,
      comments: [
        { id: 1, author:'Annabelle Anaya', body:"Great stuff. Can't wait to work with you."},
        { id: 2, author:'Chris Borabe', body:"Very impressive."},
        { id: 3, author:'Tom Jones', body:"Please take me under your tutelage."}
      ]
    };
  }

  render() {
    const commentArray=this._getComments();
    let commentNodes;
    { /* now being displayed based on components state */}
    if (this.state.showComments){
      commentNodes=<div className="comment-list">{commentArray}</div>
    }
    let buttonText='Show Comments';
    if (this.state.showComments){
      buttonText='Hide Comments';
    }

    return (
      <div className="comment-box">
        <div className="comment-box">
          <CommentForm addComment={this._addComment.bind(this)}/>
        </div>
        <h3>Comments Section</h3>
        <h4 className="comment-count">{this._getCommentsTitle(commentArray.length)} </h4>
        <button onClick={this._handleClick.bind(this)}>Show Comments</button>
        {commentNodes}
      </div>
    );
  }

  _addComment(author, body){
    { /* creating a new comment object */}
    const comment={
    id: this.state.comments.length + 1,
    author,
    body
    }
    this.setState({comments:this.state.comments.concat([comment])});
  }

  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    })
  }

  _getComments(){
    { /* dynamic array should go here eventually, just removed commentsList to put in state constructor */}
    return this.state.comments.map((item) => {
      return(
        <Comments author={item.author} body={item.body} key={item.id} />
      );
    });
  }

  _getCommentsTitle(commentCount){
    if (commentCount === 0){
      return 'No Comments Yet'
    } else if (commentCount === 1){
      return '1 Comment'
    } else return `${commentCount} Comments`;
  }
}

class CommentForm extends Component {
  constructor(){
    super();
    this.state={
      characters: 0
    }
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label> Got something to say?</label>
          <div className="comment-form-fields">
            <input placeholder="Name:" ref={(input) => this._author=input} />
          <textarea placeholder="Comment:" ref={(textarea) => this._body=textarea}
            onKeyUp={this._getCharacterCount.bind(this)}
            ></textarea>
          </div>
          <p>{this.state.characters} characters</p>
          <div className="comment-form-actions">
            <button type="submit">
              Post Comment
            </button>
          </div>
      </form>
    );
  }


  _handleSubmit(event){
    event.preventDefault();
    if (!this._author.value || !this._body.value) {
         alert("Please enter your name and comment");
         return
       }

    let author=this._author;
    let body=this._body;

    this.props.addComment(author.value, body.value);

    this._author.value = '';
    this._body.value = '';
    this.setState({ characters: 0 });
  }

  _getCharacterCount(){
    this.setState({characters: this._body.value.length});
  }

}

class Comments extends Component {
  render () {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">{this.props.body}</p>
      </div>
    );
  }
}

class App extends Component {
    render() {

        const now=new Date();
        const listOfThings=['First item of the list: I am a magician', 'Other item on the list: I am the master of the universe', 'Last item of the list: everybody come see how good I am']
        return (
          <div className="App" >
              <div className="App-header" >
              <img src={logo}
                className="App-logo"
                alt="logo" / >
              <h2 > Michael's React Cabin < /h2>
              < / div >
              <p className="App-intro" > Look at what I made. It is a cabin to put react stuff. </p>
              <p> Current time: { now.toTimeString() }  < /p>
              <ul>
              { /* curly braces intrepreted direclty as js which is why these comments work */}
                {listOfThings.map( thing => <li>{thing}</li>)}
             </ul>

             { /* Pass in static comments */}
             <Comments author="Kim Todd" body="I made this comment. Just now. But it is static."/>
             { /* Passing over dynamic comments */}
             <CommentBox />

         </div>
        );
    }
}


export default App;
