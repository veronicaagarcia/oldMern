import { Component } from "react"
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        id: ''
    }

    async componentDidMount(){

        const path = window.location.pathname.split("edit/")
        const idNote = path[1]

        const res = await axios.get('http://localhost:5000/api/users')
        this.setState({
            users: res.data,
            userSelected: res.data[0].username
        })

        if (idNote) {
            const res = await axios.get(`http://localhost:5000/api/notes/${idNote}`)
            this.setState({
                userSelected: res.data.author,
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                editing: true,
                id: idNote
            })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const newNote = {
            title: this.state.title,
            author: this.state.userSelected,
            content: this.state.content,
            date: this.state.date
        }

        if (this.state.editing){
            await axios.put(`http://localhost:5000/api/notes/${this.state.id}`, newNote)
        } else {
            await axios.post('http://localhost:5000/api/notes', newNote)
        }

        window.location.href= '/'
    }

    infoChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }

    dataChange = (date) => {
        this.setState({date})
    }

    render(){
        return (
            <div className="container-fluid mt-4 w-50 bg-light pt-2">
                {
                    this.state.editing 
                    ? <h2> Edit Note </h2>
                    : <h2>Create Note</h2>
                }
                    <form className="mb-3 w-30 p-2" onSubmit={this.handleSubmit}>
                            <label>Author:</label>
                        <select 
                            value={this.state.userSelected}
                            className="form-select" 
                            aria-label="Default select example" 
                            name="userSelected" 
                            onChange={this.infoChange}>
                            {
                                this.state.users.map( user => 
                                    <option key={user._id} value={user.username}>{user.username}</option>
                                )
                            }
                        </select>
                        <label className="mt-4">Title:</label>
                        <input 
                            value={this.state.title}
                            type="text" 
                            className="form-control mb-4" 
                            name="title" 
                            onChange={this.infoChange}
                        />
                        <label>Content:</label>
                        <textarea 
                            value={this.state.content}
                            name="content" 
                            className="form-control mb-4"
                            onChange={this.infoChange} 
                        />
                        <label>Date:</label>
                        <DatePicker 
                            // value={this.state.date}
                            className="form-control mb-4" 
                            selected={this.state.date} 
                            onChange={this.dataChange}
                        /><hr/>
                        <button  type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
           
        )
    }
}