import React, { useState, useRef } from 'react'
import { Grid, Input } from 'semantic-ui-react'
import SearchResultList from './SearchResultList'
import _ from 'lodash'

const API_URL = 'https://trackapi.nutritionix.com/v2';

const source = {
      "common": [
        {
          "food_name": "cheese",
           "serving_unit": "slice (1 oz)",
           "tag_name": "cheese",
           "serving_qty": 1,
           "common_type": null,
           "tag_id": "1034",
           "photo": {
             "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/1034_thumb.jpg"
           },
           "locale": "en_US"
        },
        {
          "food_name": "cheesecake",
           "serving_unit": "piece (1 NLEA serving)",
           "tag_name": "cheesecake",
           "serving_qty": 1,
           "common_type": null,
           "tag_id": "107",
           "photo": {
             "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/107_thumb.jpg"
           },
           "locale": "en_US"
        },
      ]
    }

/*
async function getInfo(value) {
  try {
    let res = await fetch(`${API_URL}/search/instant?query=${value}`,{
      method: 'GET',
      headers: {
        'x-app-id': 'f1bf6a19',
        'x-app-key': '8396f81cee3299cc7b01f54ec10c6d49', 
        'Accept': 'application/json'
      }
    });

    return await res.json();

  } catch (error) {
    throw new Error(error);
  }
}*/

const FoodSearch = () => {

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [value, setValue] = useState('')
  const [displayResults, setDisplayResults] = useState(false)

  const handleSearchChange = (e) => {
    let inputValue = e.target.value

    setLoading(true)
    setValue(inputValue)
    setDisplayResults(true)

    setTimeout(() =>{

      if (inputValue.length < 1) {
        setLoading(false)
        setResults(null)
        setValue('')
        setDisplayResults(false)
        return;
      }

      const re = new RegExp(_.escapeRegExp(inputValue), 'i')

      /*
      getInfo(re).then(jsonRes => {
        setLoading(false)
        setResults(jsonRes)
      });*/

      setLoading(false)
      setResults(source)
    }, 300)
  }

  const searchInputRef = useRef(null);

  const handleClickOutside = () => {
    setDisplayResults(false)
    console.log('outside')
  }

  const updateSearchInputRef = () => {
    console.log('Updating');
    //searchInputRef.current.addEventListener("focus", handleSearchInputFocus)
  }

  const handleSearchInputFocus = () => {
    console.log('Handling')
  }

  const sucker = () => {
    console.log('Sucker')
  }


  return (
    <Grid.Row centered columns={4}>
      <Grid.Column>
        <div>
          <Input 
            ref={searchInputRef}
            loading={loading} 
            size='small' 
            icon='search' 
            placeholder='Search...' 
            onChange={_.debounce(handleSearchChange,
              500, {
                leading: true,
              })} 
            value={value}
          />
          
          { 
            (results !== null && displayResults) &&
            <SearchResultList
              results={results}
              displayResults={displayResults}
              onClickOutside={handleClickOutside}
              addEventListenerToSearchInput={updateSearchInputRef}
              suck={sucker}
            />
          }
        </div>
      </Grid.Column>
    </Grid.Row>
    
  )
}

export default FoodSearch
