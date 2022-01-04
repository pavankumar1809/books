import React, { useState } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

function Update(props) {

    const [input, setInput] = useState({
        title : '',
        author : ''
    });

    
    const history = useHistory()
    const {id} = useParams()
    
    //getData()
    const updateData = async () => {
        try {
            const res = await axios.put(`/posts/${id}`, input);
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
        
      };

      function handleChange(e){
        setInput((input) => ({
            ...input, 
            [e.target.name]: e.target.value,
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if(input.title.length!==0 && input.author.length!==0){
             updateData()
        }
        
        setInput({
            title : '',
            author : ''
        })
        history.push('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleChange} placeholder='Title *'  name='title' value={input.title}/>
                <input type='text' onChange={handleChange} placeholder='Author *' name='author' value={input.author}/>
                <input className='add' type='submit' onChange={handleChange} value='Update'/>
            </form>
        </div>
    )
}

export default Update
