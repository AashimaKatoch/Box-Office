import React, {useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';


const Home = () => {
const [input, setInput] =useState('');
const [results,setResults] =useState(null);
const [searchOptions , setSearchOptions] = useState('shows');

const isShowSearch = searchOptions ==='shows';




const onSearch = () =>{
  // https://api.tvmaze.com/search/shows?q=men

  apiGet(`/search/${searchOptions}?q=${input}`).then(result=>{

   setResults(result);
    
  });

}

const onInputChange = (ev)=>{

  setInput(ev.target.value);

}



const onKeyDown = ev =>{
 if(ev.key === 'Enter'){
  onSearch();

 }

};


const onRadioChange=(ev)=>{

  setSearchOptions(ev.target.value);
};




const renderResults =()=>
{
  if(results && results.length===0)
  {

    return <div>No results</div>

  }

  if(results && results.length > 0)
  { return results[0].show ?( <ShowGrid data = {results}/>) : (<ActorGrid data = {results} />)
     

  }


  return null;
};




return (
    <MainPageLayout>
      <input type="text"
      placeholder='Search for something'
       onChange={onInputChange}  
       onKeyDown={onKeyDown} 
       value={input}/>


<div>

<label htmlFor='shows-search'>
  Shows
  <input id = "shows-search " 
  type="radio" 
  value="shows" 
  checked ={isShowSearch} 
  onChange={onRadioChange}
  />

</label>


<label htmlFor='actors-search'>

   Actors
  <input id = "actors-search " 
  type="radio" 
  checked ={!isShowSearch} 
  value="people" 
  onChange={onRadioChange}/>

</label>


</div>

      <button type='button' 
      onClick={onSearch} >
      Search
      </button>

      {renderResults()}
    </MainPageLayout>
  );
};

export default Home