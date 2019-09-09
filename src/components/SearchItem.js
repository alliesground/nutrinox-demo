import React from 'react'
import { List, Image } from 'semantic-ui-react'

const SearchItem = ({ item, getItemProps }) => {

  return (
    <List.Item
      {
        ...getItemProps({
          item,
        })
      }
    >
      <Image avatar src={ item.photo.thumb } />
      <List.Content>
        <List.Header>{ item.food_name }</List.Header>
      </List.Content>
    </List.Item>
  )
}

export default SearchItem;
