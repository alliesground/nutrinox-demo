import React, { useState, useEffect } from 'react'
import Downshift from 'downshift'
import { Modal, Input, Loader } from 'semantic-ui-react'
import _ from 'lodash'
import SearchResultList from './SearchResultList'
import IntakeForm from './IntakeForm'

const API_URL = 'https://trackapi.nutritionix.com/v2';
const APP_ID = 'f1bf6a19';
const APP_KEY = '8396f81cee3299cc7b01f54ec10c6d49'; 

const initialItemDetails = {
  data: null,
  loading: false,
  completed: false,
  error: false
}

const initialItems = {
  data: null,
  loading: false,
  completed: false,
  error: false
}

const FoodSearchForm = ({ onIntakeSubmit, ...props }) => {

  const [items, setItems] = useState(initialItems)

  const [itemDetails, setItemDetails] = useState(initialItemDetails)

  const [inputValue, setInputValue] = useState('')
  const [displayResults, setDisplayResults] = useState(false)

  const [intake, setIntake] = useState(null)
  const [intakeFormOpen, setIntakeFormOpen] = useState(false) 


  const handleSearchChange = (e, {value}) => {

    setInputValue(value) 

    setTimeout(() =>{

      if (value.length < 1) {

        setDisplayResults(false)
        setInputValue('')
        setItems(initialItems)

        return;
      }

      const re = new RegExp(_.escapeRegExp(value), 'i')

      fetchItems(re)

    }, 300)
  }

  async function fetchItems(value) {
    setItems({
      ...initialItems,
      data: items.data,
      loading: true
    })

    try {
      let res = await fetch(`${API_URL}/search/instant?query=${value}`,{
        method: 'GET',
        headers: {
          'x-app-id': APP_ID,
          'x-app-key': APP_KEY, 
          'Accept': 'application/json'
        }
      });

      res.json()
        .then(jsonRes => {
          setItems(
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
    setIntakeFormOpen(false)
  }

  useEffect(() => {
    if (itemDetails.completed) {
      setIntake(newIntake(itemDetails.data.foods[0]))
    }

    return () => {
      setIntake(null)
    }
  }, [itemDetails])

  useEffect(() => {
    if (items.completed && items.data) {
      setDisplayResults(true)
    }
  }, [items])

  const handleIntakeSubmit = (intake) => {
    onIntakeSubmit(intake)
    setIntakeFormOpen(false)
  }

  const handleOuterClick = () => {
    setDisplayResults(false)
    setInputValue('')
  }

  return (
    <>
      <Modal
        open={intakeFormOpen}
        onClose={handleCloseIntakeForm}
        size='mini'
      >
        {
          (itemDetails.loading && <Loader active />) || (
            (itemDetails.completed && intake) ? (
              <IntakeForm 
                intake={intake}
                onSubmit={handleIntakeSubmit}
                onCancel={handleCloseIntakeForm}
              />
            ) : null
          )
        }
      </Modal>

      <Downshift
        onSelect={handleSelection}
        itemToString={item => (item ? item.value : '')}
        isOpen={displayResults}
        onOuterClick={handleOuterClick}
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
              loading={items.loading}
              size='small'
              icon='search'
              placeholder='Search...'
              fluid
              ref={props.searchInputRef}
            />
            {
              (isOpen && items.data) ? (
                <SearchResultList
                  results={items.data}
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
