import React from 'react'
import { List, Image } from 'semantic-ui-react'

const SearchItem = ({ item }) => (
    <List.Item>
      <Image avatar src={ item.photo.thumb } />
      <List.Content>
        <List.Header>{ item.food_name }</List.Header>
      </List.Content>
    </List.Item>
)

export default SearchItem;
