import React, { useState } from 'react'
import { Grid, Header, Icon } from 'semantic-ui-react'

const currentDate = new Date(new Date().toDateString())

const IntakeSlider = ({ onPrevClick, onNextClick, date }) => {

  const isCurrentDate = () => (
    (date.valueOf() === currentDate.valueOf())
  )

  return (
    <Grid>
      <Grid.Column width={3}>
        <Icon 
          link
          name='chevron left' 
          onClick={onPrevClick}
        />
      </Grid.Column>

      <Grid.Column width={10} textAlign='center'>
        <Header>
          { isCurrentDate() ? "Today" : date.toDateString() }
        </Header>
      </Grid.Column>

      <Grid.Column width={3} textAlign='right'>
        <Icon 
          link
          name='chevron right' 
          onClick={onNextClick}
        />
      </Grid.Column>
    </Grid>
  )
}

export default IntakeSlider
