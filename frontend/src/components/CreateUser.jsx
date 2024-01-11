import { Component } from "react"
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/users')
        this.setState({users: res.data})
    }

    componentDidMount(){
        this.getUsers() 
    }

    onChangeUsername = (e) => {
        this.setState({username: e.target.value})
    }

    onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5000/api/users', {
            username: this.state.username
        })
        this.setState({username:''})
        this.getUsers()
    }

    onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/users/${id}`)
        this.getUsers()
    }

    render(){
        return (
            <div className="container-fluid d-flex mt-4">
                <div className="container-fluid col-4">
                    <h2>Create User</h2>
                    <form className="mb-3 w-30 p-4" onSubmit={this.onSubmit}>
                        <input 
                            type="text" 
                            className="form-control mb-4" 
                            id="username" 
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <button  type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
                
                <div className="container-fluid d-flex flex-wrap p-4">
                {
                    this.state.users.map(user => 

                    <div key={user._id} className="card text-center w-50">
                        <div className="card-header">
                            Username
                        </div>
                        <div className="card-body mt-3">
                            <h5 className="card-title">{user.username}</h5>
                        </div>
                        <div className="card-footer text-muted">
                            <button className="btn btn-danger" onClick={() => this.onDelete(user._id)}>Delete</button>
                        </div>
                    </div>
                    )
                }
                </div>
            </div>
           
        )
    }
}