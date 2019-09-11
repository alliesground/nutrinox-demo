import React, { useState, useEffect } from 'react'
import Downshift from 'downshift'
import { Modal, Input } from 'semantic-ui-react'
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
  ],

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
const APP_ID = 'f1bf6a19';
const APP_KEY = '8396f81cee3299cc7b01f54ec10c6d49';

/*
async function getInfo(value) {
  try {
    let res = await fetch(`${API_URL}/search/instant?query=${value}`,{
      method: 'GET',
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': APP_KEY, 
        'Accept': 'application/json'
      }
    });

    return await res.json();

  } catch (error) {
    throw new Error(error);
  }
}*/




const initialItemDetails = {
  data: null,
  loading: false,
  completed: false,
  error: false
}


const FoodSearchForm = ({ onIntakeSubmit }) => {

  const [itemsLoading, setItemsLoading] = useState(false)
  const [itemDetails, setItemDetails] = useState(initialItemDetails)

  const [results, setResults] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [displayResults, setDisplayResults] = useState(false)

  const [intake, setIntake] = useState(null)
  const [intakeFormOpen, setIntakeFormOpen] = useState(false) 


  const handleSearchChange = (e, {value}) => {
    setItemsLoading(true)
    setInputValue(value)
    setDisplayResults(true)

    setTimeout(() =>{

      if (value.length < 1) {
        setItemsLoading(false)
        setResults(null)
        setInputValue('')
        setDisplayResults(false)
        return;
      }

      const re = new RegExp(_.escapeRegExp(value), 'i')

      /*
      getInfo(re).then(jsonRes => {
        setItemsLoading(false)
        setResults(jsonRes)
      });*/

      setItemsLoading(false)
      setResults(response)
    }, 300)
  }

  async function fetchBrandedItemDetails(item) {
    setItemDetails({
      ...initialItemDetails,
      loading: true,
    })

    try {
      let res = await fetch(`${API_URL}/search/item?nix_item_id=${item.nix_item_id}`,{
        method: 'GET',
        headers: {
          'x-app-id': APP_ID,
          'x-app-key': APP_KEY, 
          'Accept': 'application/json'
        }
      });

      res.json()
        .then(jsonRes => {
          setItemDetails(
            {
              data: jsonRes,
              loading: false,
              completed: true,
              error: false
            }
          )
        })

    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function fetchCommonItemDetails(item) {
    setItemDetails({
      ...initialItemDetails,
      loading: true,
    })

    try {
      let res = await fetch(`${API_URL}/natural/nutrients`,{
        method: 'POST',
        body: JSON.stringify({query: item.food_name}),
        headers: {
          'x-app-id': APP_ID,
          'x-app-key': APP_KEY, 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      res.json()
        .then(jsonRes => {
          setItemDetails(
            {
              data: jsonRes,
              loading: false,
              completed: true,
              error: false
            }
          )
        })

    } catch (error) {
      throw new Error(error);
    }
  }

  const newIntake = (itemDetails) => {
    return {
      ...itemDetails.nix_item_id && { nix_item_id: itemDetails.nix_item_id },
      food_name: itemDetails.food_name,
      serving_unit: itemDetails.serving_unit,
      serving_weight_grams: itemDetails.serving_weight_grams,
      serving_qty: itemDetails.serving_qty,
      nf_calories: itemDetails.nf_calories,
      thumb: itemDetails.photo.thumb,
    }
  }

  const handleSelection = (item) => {
    setIntakeFormOpen(true)

    item.nix_item_id ? (
      fetchBrandedItemDetails(item)
    ) : (
      fetchCommonItemDetails(item)
    )
  }

  const handleCloseIntakeForm = () => {
    //setDisplayResults(false)
    setIntakeFormOpen(false)
  }

  useEffect(() => {
    if (itemDetails.completed) {
      setIntake(newIntake(itemDetails.data.foods[0]))
    }
  }, [itemDetails])

  const testItemDetails = {
    ...initialItemDetails,
    completed: true
  }

  const testIntake = {
    food_name: 'TestFood', 
    serving_unit: 'pack',
    serving_qty: 0.5,
    serving_weight_grams: 112.1,
    nf_calories: 253.99
  }

  console.log(testItemDetails)

  const handleIntakeSubmit = (intake) => {
    onIntakeSubmit(intake)
    setIntakeFormOpen(false)
  }

  return (
    <>
      <Modal
        open={intakeFormOpen}
        onClose={handleCloseIntakeForm}
        size='mini'
      >
        {
          (testItemDetails.completed && testIntake) ? (
            <IntakeForm 
              intake={testIntake}
              onSubmit={handleIntakeSubmit}
            />
          ) : null
        }
      </Modal>

      <Downshift
        onSelect={handleSelection}
        itemToString={item => (item ? item.value : '')}
        isOpen={displayResults}
        onOuterClick={() => setDisplayResults(false)}
        inputValue={inputValue}
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
              loading={itemsLoading}
              size='small'
              icon='search'
              placeholder='Search...'
              fluid
            />
            {
              isOpen ? (
                <SearchResultList
                  results={response}
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
