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
import $ from 'jquery';

class BlogEntry extends Component {
    constructor() {
        super();
        this.state={
            entries: []
        };
    }

    componentWillMount() {
        $.ajax({
            method: 'GET',
            url: "/blogentries",
            success: (blogentries) => {
                let entries=JSON.parse(blogentries);
                this.setState({
                    entries
                })
            }
        });
    }

    render() {
        const entryArray=this.state.entries.map((item) => {
            return ( <
                div className="entry"
                key={
                    item.id
                } >
                <
                p className="entry-header" > {
                    item.title
                } < /p> <
                p className="entry-body" > {
                    item.body
                } < /p> < /
                div >
            )
        });
        return ( <
            div className="blog-box" > {
                entryArray
            } <
            /div>
        );
    }
}

class CommentBox extends Component {
    constructor() {
        super();
        this.state={
            showComments: false,
            comments: [{
                id: 1,
                author: 'No Comments Yet',
                body: ""
            }]
        };
    }

    componentWillMount() {
        { /* Called before the component is rendered */ }
        this._fetchComments();
    }

    componentDidMount() {
        { /* Called after the component is rendered */ }
        this._timer=setInterval(() => this._fetchComments(), 5000);
    }

    componentWillUnmount() {
        { /* Called when component is being removed from dom */ }
        clearInterval(this._timer);
    }


    _addComment(author, body) {
        { /* creating a new comment object */ }
        const comment={
            author,
            body
        }

        $.post('/comments', {
                comment
            })
            .success(newComment => {
                this.setState({
                    comments: this.state.comments.concat([newComment])
                });
            });

        // const comment={
        // id: this.state.comments.length + 1,
        // author,
        // body
        // }
        // this.setState({comments:this.state.comments.concat([comment])});
    }

    _deleteComment(comment) {
        $.ajax({
            method: 'DELETE',
            url: `/comments/${comment.id}`
        })
        const comments=[...this.state.comments];
        const commentIndex=comment.indexOf(comment);
        comments.splice(commentIndex, 1);
        this.setState({
            comments
        });
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        })
    }

    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No Comments Yet'
        } else if (commentCount === 1) {
            return '1 Comment'
        } else return `${commentCount} Comments`;
    }

    _fetchComments() {
        $.ajax({
            method: 'GET',
            url: '/comments',
            success: (gottenComments) => {
                let comments=JSON.parse(gottenComments);
                console.log(comments.length)
                this.setState({
                    comments
                })
            }
        });
    }

    render() {

        const commentArray=this.state.comments.map((item) => {
            return ( <
                Comments author={
                    item.author
                }
                body={
                    item.body
                }
                key={
                    item.id
                }
                onDelete={
                    this._deleteComment.bind(this)
                }
                />
            )
        });

        { /* comments displayed based on components state */ }
        let commentNodes;
        if (this.state.showComments) {
            commentNodes=< div className="comment-list" > {
                commentArray
            } < /div>
        }

        { /* comments button text changes accordingly */ }
        let buttonText='Show Comments';
        if (this.state.showComments) {
            buttonText='Hide Comments';
        }

        return ( <
                div className="comment-box" >
                <
                div className="comment-box" >
                <
                CommentForm addComment={
                    this._addComment.bind(this)
                }
                /> < /
                div > <
                h4 className="comment-count" > {
                    this._getCommentsTitle(commentArray.length)
                } < /h4> <
                button onClick={
                    this._handleClick.bind(this)
                } > {
                    buttonText
                } < /button> {
                commentNodes
            } <
            /div>
    );
}

}

class CommentForm extends Component {
    constructor() {
        super();
        this.state={
            characters: 0
        }
    }

    render() {
        return (
          <form className="comment-form" onSubmit={ this._handleSubmit.bind(this)}>
              <label> Got something to say ? < /label>
              <div className="comment-form-fields" >
                <input placeholder="Name:" ref={  (input) => this._author=input}/>
                <textarea placeholder="Comment:" ref={
                    (textarea) => this._body=textarea
                    } onKeyUp={
                    this._getCharacterCount.bind(this)
                } > </textarea>
              </div>
              <p> {this.state.characters} characters </p>
              <div className="comment-form-actions" >
                <button type="submit" > Post Comment </button>
              </div>
            < /form>
        );
    }


    _handleSubmit(event) {
        event.preventDefault();
        if (!this._author.value || !this._body.value) {
            alert("Please enter your name and comment");
            return
        }

        let author=this._author;
        let body=this._body;

        this.props.addComment(author.value, body.value);

        this._author.value='';
        this._body.value='';
        this.setState({
            characters: 0
        });
    }

    _getCharacterCount() {
        this.setState({
            characters: this._body.value.length
        });
    }

}

class Comments extends Component {
    render() {
        return ( <
            div className="comment" >
            <
            p className="comment-header" > {
                this.props.author
            } < /p> <
            p className="comment-body" > {
                this.props.body
            } < /p> <
            a href="#"
            onClick={
                this._handleDelete.bind(this)
            } > Delete Comment < /a> < /
            div >
        );
    }

    _handleDelete(event) {
        event.preventDefault();
        if (confirm('Are you sure?')) {
            this.props.onDelete(this.props.comment);
        }
    }
}

class App extends Component {
    render() {

        return ( <
            div className="App" >
            <
            div className="App-header major" >
            <
            h2 > Kim 's React Blog < /h2> < /
            div > <
            p className="App-intro" > A place
            for further examination of my projects and thoughts and such.Organized chronologically. < /p>

            { /* Pass in static comments */ } <
            Comments author="Kim Todd"
            body="I made this comment. Just now. But it is static. It is an example that is hard coded." / > { /* Passing over dynamic comments */ } <
            BlogEntry / >
            <
            p > This is the comment box below < /p> <
            CommentBox / >
            <
            /div>
        );
    }
}


export default App;
