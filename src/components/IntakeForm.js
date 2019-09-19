import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Grid, 
  Header, 
  Image, 
  Statistic, 
  Divider, 
  Select,
  Button,
  Icon,
  Popup
} from 'semantic-ui-react';

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

const IntakeForm = ({ intake, onSubmit, onCancel, totalCalConsumed, goal }) => {
  const [servingSize, setServingSize] = useState('1.0')
  const [mealType, setMealType] = useState(mealTypeOptions[0].value)
  const [grams, setGrams] = useState(intake.serving_weight_grams)
  const [calories, setCalories] = useState(intake.nf_calories)

  const [isGoalExceeded, setIsGoalExceeded] = useState(false)

  const increaseServingSize = () => {
    if (isGoalExceeded) return

    let servingSizeNum = parseFloat(servingSize);
    setServingSize((servingSizeNum + 1).toFixed(1))
  }

  const decreaseServingSize = () => { 
    let servingSizeNum = parseFloat(servingSize);
    if ((servingSizeNum - 1) < 1) return

    if (isGoalExceeded) setIsGoalExceeded(false)

    setServingSize((servingSizeNum - 1).toFixed(1))
  }

  const calculateGrams = () => {
    const newVal = (servingSize / intake.serving_qty) * intake.serving_weight_grams
    setGrams(newVal)
  }
  
  const calculateCalories = () => {
    const newVal = (servingSize / intake.serving_qty) * intake.nf_calories
    setCalories(newVal)
  }

  const handleMealSelection = (e, { value }) => {
    setMealType(value)
  }

  const handleSubmit = () => {
    onSubmit({
      ...intake,
      serving_size: servingSize,
      meal_type: mealType,
      serving_weight_grams: grams,
      nf_calories: calories
    })
  }

  const handleCloseForm = () => {
    onCancel()
  }

  useEffect(() => {
    if (isGoalExceeded) return

    calculateGrams()
    calculateCalories()

  }, [servingSize])

  useEffect(() => {

    if (totalCalConsumed + calories > goal) {
      setIsGoalExceeded(true)
    }

  }, [calories])

  return (
    <>
      <div className='content'>
        <Header as='h3'>
          <Icon link name='close' 
            style={{float:'right'}}
            color='violet'
            onClick={handleCloseForm}
          />
          <Image 
            wrapped 
            size='massive' 
            src={intake.thumb} 
          /> 
          <br />
          { intake.food_name }
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
              {intake.serving_unit}
            </b>
          </Grid.Column>

          <Grid.Column width={4}
            style={{
              paddingTop:'30px'
            }}
          >
            <Statistic size='mini'>
              <Statistic.Value>{ Math.round(grams) }</Statistic.Value>
              <Statistic.Label>grams</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column width={4}
            style={{
              paddingTop:'30px'
            }}
          >
            <Popup
              trigger={
                <Statistic size='mini'>
                  <Statistic.Value>{ Math.round(calories) }</Statistic.Value>
                  <Statistic.Label>calories</Statistic.Label>
                </Statistic>
              }
              content='You have exceeded your Goal'
              open={isGoalExceeded}
              position='top right'
              offset='0, 20px'
            />
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
              value={mealType}
              onChange={handleMealSelection}
              selection
              style={{
                backgroundColor:'#f2f2f2'
              }}
              disabled={isGoalExceeded}
            />

            <br />

            <Button
              size='huge'
              color='violet'
              floated='right'
              onClick={handleSubmit}
              disabled={isGoalExceeded}
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
