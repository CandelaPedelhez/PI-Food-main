import {React} from 'react';
import {Link} from 'react-router-dom';
import '../css/style.css';

export default function Landing(){
    return(
        <div class='container'>
        <h1>Welcome to the best online recipe book</h1>
        <Link to= "/home">
            <button>Enter</button>
        </Link>
        </div>
    )
}