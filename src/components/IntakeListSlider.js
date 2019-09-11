import React from 'react'
import { Grid, Header, Icon } from 'semantic-ui-react'

const currentDate = new Date(new Date().toDateString())

const IntakeSlider = ({ onPrevClick, onNextClick, date, headerColor }) => {

  const isCurrentDate = () => (
    (date.valueOf() === currentDate.valueOf())
  )

  return (
    <Grid verticalAlign='middle'>
      <Grid.Column width={3}>
        <Icon 
          link
          name='chevron left' 
          onClick={onPrevClick}
        />
      </Grid.Column>

      <Grid.Column width={10} textAlign='center'>
        <Header as='h2' style={{color:headerColor}}>
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
