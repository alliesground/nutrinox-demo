import React from  'react'
import {Grid, Header, Progress} from 'semantic-ui-react'
import useCalConsumed from './hooks/useCalConsumed'

const IntakeSummary = ({ intakeList, goal }) => {

  const calConsumed = useCalConsumed(intakeList)
  
  const percentConsumed = Math.round(calConsumed.total / goal * 100)

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column floated='left' width={7}>
          <Header as='h3'>
            {Math.round(calConsumed.total)} cal
            <Header.Subheader>
              consumed
            </Header.Subheader>
          </Header> 
        </Grid.Column>

        <Grid.Column floated='right' width={7}>
          <Header as='h3' textAlign='right'>
            {goal}
            <Header.Subheader>
              my goal
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Progress percent={percentConsumed} size='tiny' color='violet'>
            { percentConsumed }%
          </Progress>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={4} textAlign='center'>
        <Grid.Column>
          <Header as='h3'>
            {Math.round(calConsumed.breakfast)}
            <Header.Subheader>
              Breakfast
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            {Math.round(calConsumed.lunch)}
            <Header.Subheader>
              Lunch
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            {Math.round(calConsumed.dinner)}
            <Header.Subheader>
              Dinner
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            {Math.round(calConsumed.snack)}
            <Header.Subheader>
              Snack
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default IntakeSummary;
