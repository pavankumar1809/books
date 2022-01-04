import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'


function CrudApp(props) {

    const [data, setData] = useState([])
    const [inputs, setInputs] = useState({
        title : '',
        author : ''
    })

    axios.defaults.baseURL = "http://localhost:3001";

    const getData = () => {
        axios.get("/posts").then(res => {
            setData(res.data)
        });
      };
    
    function postData() {
        axios
          .post("/posts", inputs)
          .then((res) => console.log(res.data))
          .catch((res) => console.log(res));

          setInputs({
            title : '',
            author : ''
        })
      };

    function handleChange(e){
        setInputs((input) => ({
            ...input, 
            [e.target.name]: e.target.value,
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        if(inputs.title.length!==0 && inputs.author.length!==0){            
             postData()
        }
        else{
            alert("Fill the required details...!")
        }
        console.log(inputs)
        setInputs({
            title : '',
            author : ''
        })
        getData()
    }
    
    useEffect(()=>{
        getData();
    },[inputs])

    return (
        <div>
            <h1>CrudApp</h1>
            <form onSubmit={handleSubmit}>
                <input className="required" type='text' onChange={handleChange} placeholder='Title *'  name='title' value={inputs.title} />
                <input type='text' onChange={handleChange} placeholder='Author *' name='author' value={inputs.author} />
                <input className='add' type='submit' onChange={handleChange} value='Post'/>
            </form>
            <button onClick={getData}>Get</button>
            <div className='productContainer'>
            {data.map((item) => {
               return <div key={item.id} className='products'>
               <p>Book: {item.title}<br/>Author: {item.author}</p>
               <button className='alter'><Link  to={`/update/${item.id}`}>Update</Link></button>
               <button className='alter' onClick={() => { 
                   axios.delete(`posts/${item.id}`).then((res) =>setInputs({
                       title:'',
                       author: ''
                   }));
                   
                }}>Delete</button>
               </div>
            })}
            </div>
        </div>
    )
}

export default CrudApp
