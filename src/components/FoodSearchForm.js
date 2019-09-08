import React, { useState } from 'react'
import Downshift from 'downshift'
import { Grid, Input, Segment, List, Header } from 'semantic-ui-react'
import _ from 'lodash'
import SearchResultList from './SearchResultList'

const response = {
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

const API_URL = 'https://trackapi.nutritionix.com/v2';

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

const FoodSearchForm = () => {

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [value, setValue] = useState('')
  const [displayResults, setDisplayResults] = useState(false)

  const handleSearchChange = (e, {value}) => {
    setLoading(true)
    setValue(value)
    setDisplayResults(true)

    setTimeout(() =>{

      if (value.length < 1) {
        setLoading(false)
        setResults(null)
        setValue('')
        setDisplayResults(false)
        return;
      }

      const re = new RegExp(_.escapeRegExp(value), 'i')

      /*
      getInfo(re).then(jsonRes => {
        setLoading(false)
        setResults(jsonRes)
      });*/

      setLoading(false)
      setResults(response)
    }, 300)
  }

  return (
    <Grid doubling centered columns={4}>
      <Grid.Column>
        <Downshift
          onChange={selection =>
            alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
          }
          isOpen={displayResults}
          onOuterClick={() => setDisplayResults(false)}
          inputValue={value}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <Input 
                {
                  ...getInputProps({
                    onChange: _.debounce(handleSearchChange, 
                    500,
                    { leading: true })
                  })
                } 
                loading={loading}
                size='small'
                icon='search'
                placeholder='Search...'
                fluid
              />
              {
                isOpen ? (
                  <SearchResultList 
                    results={response}
                  />
                ) : null
              }

            </div>
          )}
        </Downshift>
      </Grid.Column>
    </Grid>
  )
}

export default FoodSearchForm;
