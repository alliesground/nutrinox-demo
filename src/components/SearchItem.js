import React from 'react'
import { List } from 'semantic-ui-react'

const SearchItem = ({ item }) => (
    <List.Content>
      { item.food_name }
    </List.Content>
)

export default SearchItem;
