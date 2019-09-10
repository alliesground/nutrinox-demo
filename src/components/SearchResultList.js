import React, { useState } from 'react'
import { Segment, List, Header, Image } from 'semantic-ui-react'
import SearchItem from './SearchItem'

const SearchResultList = ({ results, getItemProps, getMenuProps }) => {

  const searchResults = Object.entries(results).map(
    ([category, searchItems]) => {
      return (
        <>
          <Header size='medium'>{ category }</Header>
          <List selection divided relaxed verticalAlign='middle' {...getMenuProps()}>
            {
              searchItems.map(item => (
                <SearchItem 
                  item={item} 
                  getItemProps={getItemProps}
                />
              ))
            }
          </List>
        </>
      )
    }
  )

  return (
    <Segment 
      style={{position: 'absolute', 
        zIndex: '1',
        display: 'block',
        width: '100%'
      }}
    >
      { searchResults }
    </Segment>
  )
}

export default SearchResultList;
