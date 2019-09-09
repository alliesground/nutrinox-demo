import React, { useState } from 'react'
import Downshift from 'downshift'
import { Dimmer, Grid, Input, Segment, List, Header, Modal } from 'semantic-ui-react'

const Ds = () => {

  const items = [
    {value: 'apple'},
    {value: 'pear'},
    {value: 'orange'},
    {value: 'grape'},
    {value: 'banana'},
  ]

  const triggerer = ({item, getItemProps, highlightedIndex, selectedItem, index }) => (
    <li
      {...getItemProps({
        key: item.value,
        index,
        item,
        style: {
          backgroundColor:
            highlightedIndex === index ? 'lightgray' : 'white',
          fontWeight: selectedItem === item ? 'bold' : 'normal',
        },
      })}
    >
      {item.value}
    </li>
  )

  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Dimmer active={modalOpen} onClickOutside={handleClose}>
        <Header as='h2'> Welcome </Header>
      </Dimmer>

      <Downshift
        //onStateChange={handleStateChange}
        onSelect={selection => {
          console.log(modalOpen)
          handleModalOpen()
        }}
        /*onChange={selection =>
          alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
        }*/
        itemToString={item => (item ? item.value : '')}
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
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(item => !inputValue || item.value.includes(inputValue))
                    .map((item, index) => (
                      triggerer({ getItemProps, highlightedIndex, selectedItem, item, index })
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    </>
  )
}

export default Ds;
