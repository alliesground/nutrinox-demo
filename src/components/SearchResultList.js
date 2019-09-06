import React from 'react'
import { Segment, List, Header } from 'semantic-ui-react'
import SearchItem from './SearchItem'

const SearchResultList = ({ results }) => { 

  const searchResults = Object.entries(results).map(
    ([category, searchItems]) => {
      return (
        <>
          <Header size='medium'>{ category }</Header>
          <List.Item>
            {
              searchItems.map(item => (
                <SearchItem item={item} />
              ))
            }
          </List.Item>
        </>
      )
    }
  )

  return (
    <div>
      <Segment>
        <List divided relaxed>
          { searchResults }
        </List>
      </Segment>
    </div>
  )
}

export default SearchResultList;
