import React from 'react';
import { Grid } from 'semantic-ui-react';
import FoodSearchForm from './FoodSearchForm';
import SlidableIntakeList from './SlidableIntakeList';

const IntakeDashboard = () =>(
  <>
    <FoodSearchForm />
    <SlidableIntakeList />
  </>
)

export default IntakeDashboard;

