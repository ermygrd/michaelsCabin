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

class CommentBox extends Component {
  render() {
    const commentArray=this._getComments();
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">Comments number goes here</h4>
        <div className="comment-list">
          {commentArray}
        </div>
      </div>
    );
  }

  _getComments(){
    { /* dynamic array should go here eventually */}
    const commentList = [
      { id: 1, author:'Annabelle Anaya', body:"Great stuff. Can't wait to work with you."},
      { id: 2, author:'Chris Borabe', body:"Very impressive."},
      { id: 3, author:'Tom Jones', body:"Please take me under your tutelage."}
    ];

    return commentList.map((item) => {
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

class App extends Component {
    render() {

        const now=new Date();
        const listOfThings=['thing1', 'thing2', 'thingOther']
        return (
          <div className="App" >
              <div className="App-header" >
              <img src={logo}
                className="App-logo"
                alt="logo" / >
              <h2 > Michael's Cabin < /h2>
              < / div >
              <p className="App-intro" > Look at what I made. It is a cabin to put react stuff. </p>
              <p> Current time: { now.toTimeString() }  < /p>
              <ul>
              { /* curly braces intrepreted direclty as js which is why these comments work */}
                {listOfThings.map( thing => <li>{thing}</li>)}
             </ul>

             { /* Pass in static comments */}
             <Comments author="Kim Todd" body="I made this comment. Just now."/>
             <Comments author="Also Kim Todd" body="Yes, I also made this comment. I am a great writer. Atom needs spell check fo rme." />

             { /* Passing over dynamic comments */}
             <CommentBox />

         </div>
        );
    }
}


export default App;
