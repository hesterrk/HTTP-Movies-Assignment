import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';


//we need to update our item state setter (MOVIE) in which component?

const initialValues = {
    id: null,
    title: '',
    director: '',
    metascore: 0,
    stars: []
  
}

function UpdateMovie (props) {


// //this state reflects changes we make on the form
const [item, setItem] = useState(initialValues)

const id  = props.match.params.id




const changeHandler = event => {
    setItem({
    ...item,
    [event.target.name] : event.target.value
});
};




  function handleSubmit(e) {
    e.preventDefault();
    const newArray = {
      ...item,
      stars: item.stars.split(',')
      
    };
    console.log(newArray)

      axios.put(`http://localhost:5000/api/movies/${id}`, newArray)
        .then(res => {
          console.log(res.data)
          props.history.push('/')
          //UPDATE DATA WITH THIS INFO SO REFRESHES -> pass along movie
        })
        .catch(err => console.log(err))

    };
    


  return ( 

  <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={item.title}
          placeholder="title"
          onChange={changeHandler}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          value={item.director}
          placeholder="director"
          onChange={changeHandler}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          value={item.metascore}
          placeholder="metascore"
          onChange={changeHandler}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          value={item.stars}
          placeholder="stars"
          onChange={changeHandler}
        />
        <div className="baseline" />

    
        <button type="submit">
         Update 
        </button>
      </form>

</div>
  );
}

export default UpdateMovie;
