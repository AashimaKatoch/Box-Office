import React, {useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from '../components/CustomRadio';


const Home = () => {
const [input, setInput] =useLastQuery();
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
      <SearchInput
      type="text"
      placeholder='Search for something'
       onChange={onInputChange}  
       onKeyDown={onKeyDown} 
       value={input}/>

<RadioInputsWrapper>
<div>

<CustomRadio
label ="shows"
id = "shows-search " 
value="shows" 
checked ={isShowSearch} 
onChange={onRadioChange}

/>


</div>

<div>
<CustomRadio
label ="Actors"
id = "actors-search " 
  value="people" 
  checked ={!isShowSearch} 
  
  onChange={onRadioChange}

/>


</div>

</RadioInputsWrapper>

<SearchButtonWrapper>
      <button type='button' 
      onClick={onSearch} >
      Search
      </button>
</SearchButtonWrapper>

      {renderResults()}
    </MainPageLayout>
  );
};

export default Home