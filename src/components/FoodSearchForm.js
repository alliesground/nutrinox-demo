import React, { useState } from 'react'
import Downshift from 'downshift'
import { Image,Modal, Button, Grid, Input, Segment, List, Header } from 'semantic-ui-react'
import _ from 'lodash'
import SearchResultList from './SearchResultList'
import IntakeForm from './IntakeForm'

const response = {
  "branded": [
    {
      "food_name": "Crunchy Cheese",
      "serving_unit": "pieces",
      "nix_brand_id": "546b62d6ade15fe62e67f28e",
      "brand_name_item_name": "Moon Cheese Crunchy Cheese",
      "serving_qty": 7,
      "nf_calories": 70,
      "photo": {
        "thumb": "https://d1r9wva3zcpswd.cloudfront.net/5a55bb56964b65e729d92b94.jpeg"
      },
      "brand_name": "Moon Cheese",
      "region": 1,
      "brand_type": 2,
      "nix_item_id": "5a55bb52d82484467b61b8c7",
      "locale": "en_US"
    },
    {
      "food_name": "1 Slice Hard Salami, 2 Slices Colby Jack Cheese",
      "serving_unit": "pkg",
      "nix_brand_id": "54836a2305e256f87e091b03",
      "brand_name_item_name": "Cheesewich 1 Slice Hard Salami, 2 Slices Colby Jack Cheese",
      "serving_qty": 1,
      "nf_calories": 290,
      "photo": {
        "thumb": "https://d1r9wva3zcpswd.cloudfront.net/5cc552597f48b489670c02a2.jpeg"
      },
      "brand_name": "Cheesewich",
      "region": 1,
      "brand_type": 2,
      "nix_item_id": "54836a2305e256f87e091b04",
      "locale": "en_US"
    },
  ]

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
    {
      "food_name": "pie",
       "photo": {
         "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/107_thumb.jpg"
       },
    },
    {
      "food_name": "dal",
       "photo": {
         "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/107_thumb.jpg"
       },
    },
    {
      "food_name": "bhat",
       "photo": {
         "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/107_thumb.jpg"
       },
    },
    {
      "food_name": "cowly",
       "photo": {
         "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/107_thumb.jpg"
       },
    },
    {
      "food_name": "tea",
       "photo": {
         "thumb": "https://d2xdmhkmkbyw75.cloudfront.net/107_thumb.jpg"
       },
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

  const [intakeFormOpen, setIntakeFormOpen] = useState(true) 

  const handleCloseIntakeForm = () => {
    console.log('clicked outsidee')
    //setDisplayResults(false)
    setIntakeFormOpen(false)
  }

  const [intake, setIntake] = useState({food_name: 'Yummy', photo: {thumb: 'https://d2xdmhkmkbyw75.cloudfront.net/107_thumb.jpg'}})

  return (
    <> 
      <Modal
        open={intakeFormOpen}
        onClose={handleCloseIntakeForm}
        size='mini'
      >
        {
          intake ? (
            <IntakeForm 
              intake={intake}
            />
          ) : null
        }
      </Modal>

      <Downshift
        onSelect={selection => {
          if (selection) {
            setIntakeFormOpen(true)
            setIntake(selection)
          }
        }}
        itemToString={item => (item ? item.value : '')}
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
          <div style={{position: 'relative'}}>
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
                  selectedItem={selectedItem}
                  intakeFormOpen={intakeFormOpen}
                  getItemProps={getItemProps}
                  getMenuProps={getMenuProps}
                />
              ) : null
            }

          </div>
        )}
      </Downshift>
    </>
  )
}

export default FoodSearchForm;
