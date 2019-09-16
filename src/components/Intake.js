import React from 'react'
import { List, Image } from 'semantic-ui-react'

const Intake = ({ intake }) => {
  return (
    <List.Item>
      <List.Content floated='right'>
        <List.Header 
          style={{textAlign:'right'}}
        >
          {`${ Math.round(intake.nf_calories) } cal`}
        </List.Header>
        <List.Description 
          style={{textAlign:'right'}}
        >
          { intake.meal_type }
        </List.Description>
      </List.Content>

      <Image avatar src={ intake.thumb } />

      <List.Content>
        <List.Header>
          { intake.food_name }
        </List.Header>
        <List.Description>
          {
           `${ intake.serving_qty } 
            ${ intake.serving_unit }`
          }
        </List.Description>
      </List.Content> 
    </List.Item>
  )
}

export default Intake
