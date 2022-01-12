import {React} from 'react';
import {Link} from 'react-router-dom';
import styles from "../styles/Landing.module.css";

export default function Landing(){
    return(
        <div  className={styles.background}>
        <h1>Welcome to the best online recipe book</h1>
        <Link to= '/home'>
            <button>Enter</button>
        </Link>
        </div>
    )
}