import React from 'react'
import { Segment, List, Header } from 'semantic-ui-react'
import SearchItem from './SearchItem'

const SearchResultList = ({ results }) => { 

  const searchResults = Object.entries(results).map(
    ([category, searchItems]) => {
      return (
        <>
          <Header size='medium'>{ category }</Header>
          <List selection divided relaxed verticalAlign='middle'>
            {
              searchItems.map(item => (
                <SearchItem item={item} />
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
        zIndex:'9999',
        width: '100%'
      }}
    >
      { searchResults }
    </Segment>
  )
}

export default SearchResultList;
