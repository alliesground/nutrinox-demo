import React, { useState } from 'react'
import styled from 'styled-components';
import { Grid, 
  Header, 
  Image, 
  Statistic, 
  Divider, 
  Select,
  Button,
  Form,
  Input
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';

const ServingSizeInput = styled.div`
  background-color: #f2f2f2;
  padding-top: 5px;

  div:first-child {
    width: 100%;
  }

  label {
    padding-left: 14px;
    color: #6435c9;
  }

  span {
    display: block; 
    padding-top: 5px;
    padding-left: 14px;
  }

  .buttons button:first-child {
    background-color: #f2f2f2;
    border-radius: 0 .28571429rem 0 0;
  }

  .buttons button:last-child {
    background-color: #f2f2f2;
    border-radius: 0 0 .28571429rem 0;
  }
`;

const mealTypeOptions = [
  { key: 0, value: 'breakfast', text: 'Breakfast' },
  { key: 1, value: 'lunch', text: 'Lunch' },
  { key: 2, value: 'dinner', text: 'Dinner' },
  { key: 3, value: 'snack', text: 'Snack' },
]

const IntakeForm = ({ intake }) => {
  const [servingSize, setServingSize] = useState('1.0')

  const increaseServingSize = () => {
    let servingSizeNum = parseFloat(servingSize);
    setServingSize((servingSizeNum + 1).toFixed(1))
  }

  const decreaseServingSize = () => {
    let servingSizeNum = parseFloat(servingSize);
    if ((servingSizeNum - 1) < 1) return

    setServingSize((servingSizeNum - 1).toFixed(1))
  }

  console.log(intake)

  return (
    <>
      <div className='content'>
        <Header as='h3'>
          <Image 
            wrapped 
            size='massive' 
            src={intake.thumb} 
          /> 
          <br />
          Cheese
        </Header>

        <Divider />

        <Grid>
          <Grid.Column width={8}>
            <ServingSizeInput className='ui fluid action input'>
              <div>
                <label>
                  Servings
                </label>
                <span>
                  {servingSize}
                </span>
              </div>

              <div className="ui vertical icon buttons">
                <button 
                  className="ui button"
                  onClick={increaseServingSize}
                >
                  <i className="angle up icon" />
                </button>
                <button 
                  className="ui button"
                  onClick={decreaseServingSize}
                >
                  <i className="angle down icon" />
                </button>
              </div>
            </ServingSizeInput>
            <b
              style={{
                paddingLeft:'14px',
                color: '#6435c9'
              }}
            >
              slice
            </b>
          </Grid.Column>

          <Grid.Column width={4}
            style={{
              paddingTop:'30px'
            }}
          >
            <Statistic size='mini'>
              <Statistic.Value>{ intake.serving_weight_grams }</Statistic.Value>
              <Statistic.Label>grams</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column width={4}
            style={{
              paddingTop:'30px'
            }}
          >
            <Statistic size='mini'>
              <Statistic.Value>{ intake.nf_calories }</Statistic.Value>
              <Statistic.Label>calories</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid>

        <Divider />

        <Grid>
          <Grid.Column>
            <p> ADD TO TODAY </p>

            <Select 
              placeholder='Select Meal Type' 
              options={mealTypeOptions} 
              fluid 
              style={{
                backgroundColor:'#f2f2f2'
              }}
            />

            <br />

            <Button
              size='huge'
              color='violet'
              floated='right'
            >
              Add
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    </>
  )
}

export default IntakeForm;