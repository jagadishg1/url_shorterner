import axios from './utils/axios';
import { useRef, useState } from 'react';
import { ReactComponent as LinkVector } from './assets/images/link_vector.svg'
import Button from './components/button'

function App() {

    const [validLink, setValidLink] = useState(false);
    const [value,setValue] = useState('');
    const [shortLink,setShortLink] = useState('');
    const linkRef = useRef(null);

    const validateLink = (value) => {
        setValidLink(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(value))
        setValue(value)
    }

    async function generate(){
        try {
            const response = await axios.post('https://api-ssl.bitly.com/v4/shorten',{long_url: value})
            setShortLink(response.data.link)
        } catch (error) {
            alert('Something went wrong')
        }
    }

    const copy = ()=>{
        if(linkRef.current){
            linkRef.current.select()
            document.execCommand('copy')
        }
    }

    return (
        <div className="container-fluid bg-dark w-100 vh-100">
            <div className="row h-100">
                <div className="col-12 d-flex flex-column align-items-center pt-5 h-100">
                    <LinkVector width={250} height={250} />
                    <h3 className="text-white fw-bold" >Shorten your URL in no time !</h3>
                    <input
                        type="text"
                        className="form-control shadow-lg mt-5 w-50 p-3 text-center"
                        placeholder="Place your URL here"
                        onChange={(text)=>validateLink(text.target.value)}
                    />
                    <br />
                    {!validLink && <p className="text-danger fw-bold ">Please provide a valid URL</p>}
                    { validLink && <Button title="SHORTEN" onClick={generate} /> }
                    <br />
                    {
                        shortLink && (
                            <div className="d-flex align-items-center">
                                <input type="text" value={shortLink}  ref={linkRef} className="form-control pr-3" />
                                <i className="bi bi-clipboard text-white p-3" onClick={copy} ></i>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;