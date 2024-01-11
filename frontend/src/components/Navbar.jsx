import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>NotesApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link className="nav-link" to={'/user'}>Create User</Link>
                        <Link className="nav-link" to={'/create'}>Create Note</Link>
                        <Link className="nav-link" to={'/'}>Notes</Link>
                    </div>
                    </div>
                </div>
            </nav>
        )
    }
}