import React from 'react'
import { Grid, Header, Icon } from 'semantic-ui-react'

const currentDate = new Date(new Date().toDateString())


const IntakeSlider = ({ onPrevClick, onNextClick, date, headerColor }) => {

  const displayDate = () => {
    switch (true) {
      case ((date.valueOf()) === (currentDate.valueOf())):
        return 'Today';
      case ((date.getDate() + 1) === (currentDate.getDate())):
        return 'Yesterday'
      default:
        return date.toDateString()
    }
  }

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
          { displayDate() }
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
