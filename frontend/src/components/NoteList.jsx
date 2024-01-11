import { Component } from "react"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from "react-router-dom"

export default class Navbar extends Component {

    state = {
        notes: []
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:5000/api/notes')
        this.setState({notes: res.data})
    }

    componentDidMount() {
        this.getNotes()
    }

    onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/notes/${id}`)
        this.getNotes()
    }

    render(){
        return (
            <div className="container-fluid d-flex flex-wrap p-4">
                {
                    this.state.notes.map(note => 

                    <div key={note._id} className="card text-center col-3 m-auto row">
                        <h4 className="card-header">
                        {note.author}
                        </h4>
                        <div className="card-body mt-3">
                            <h3 className="card-title">{note.title}</h3>
                            <p className="card-title">{note.content}</p>
                            <p>{format(note.date)}</p>
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-evenly">
                            <button 
                            className="btn btn-danger" 
                            onClick={() => this.onDelete(note._id)}
                            >Delete</button>
                            <Link 
                            to={`/edit/${note._id}`}
                            className="btn btn-secondary" 
                            >Edit</Link>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }
}