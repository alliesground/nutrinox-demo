import React from  'react'
import {Grid, Header, Progress} from 'semantic-ui-react'

const IntakeSummary = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column floated='left' width={7}>
          <Header as='h3'>
            1289 cal
            <Header.Subheader>
              consumed
            </Header.Subheader>
          </Header> 
        </Grid.Column>

        <Grid.Column floated='right' width={7}>
          <Header as='h3' textAlign='right'>
            1500
            <Header.Subheader>
              my goal
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Progress percent={80} size='tiny' color='violet'>
            80%
          </Progress>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={4} textAlign='center'>
        <Grid.Column>
          <Header as='h3'>
            289
            <Header.Subheader>
              Breakfast
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            109
            <Header.Subheader>
              Lunch
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            129
            <Header.Subheader>
              Dinner
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            450
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