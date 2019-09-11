import React from 'react'
import { Container, Grid, Header, Image, Label } from 'semantic-ui-react';

const computerLayout = () => (
  <>
    <Grid.Column verticalAlign='middle' textAlign='right'>
      <Label circular size='massive'>
        <Header as='h3'>
          153
          <Header.Subheader>Kg</Header.Subheader>
        </Header>
      </Label>
    </Grid.Column>

    <Grid.Column>
      <Image 
        src='https://d1r9wva3zcpswd.cloudfront.net/55c92acdf04322593691010c.jpeg' 
        size='medium' circular 
      />
    </Grid.Column>

    <Grid.Column verticalAlign='middle'>
      <Label circular size='massive'>
        <Header as='h3'>
          153
          <Header.Subheader>Kg</Header.Subheader>
        </Header>
      </Label>
    </Grid.Column>
    
    <Container 
      fluid 
      textAlign='center'
      style={{
        padding: '20px',
        paddingBottom: '0px'
      }}
    >
      <Header as='h2'>Jane Appleseed</Header>
    </Container>
  </>
)

const mobileLayout = () => (
  <>
    coming soon...
  </>
)

const UserProfile = () => {
  return (
    <Grid>
      <Grid.Row only='large screen computer tablet' columns={3}>
        { computerLayout() }
      </Grid.Row>

      <Grid.Row only='mobile'>
        { mobileLayout() }
      </Grid.Row>
    </Grid>
  )
}

export default UserProfile;
