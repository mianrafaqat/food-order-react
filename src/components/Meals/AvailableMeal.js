import React, { useEffect, useState } from 'react'
import classes from './AvailableMeal.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const AvailableMeal = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState()
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      const response = await fetch('https://react-app-c161c-default-rtdb.firebaseio.com/meals.json')
      const responseData = await response.json()

      if(!response.ok) {
        throw new Error("Something Went Wrong")
      }
      
      const loadedMeals = []
      Object.keys(responseData).map((item)=>{
        loadedMeals.push({
          id: item,
          name: responseData[item].name,
          description: responseData[item].description,
          price: responseData[item].price
        }) 
      })
      

      setMeals(loadedMeals)
      setIsLoading(false)
    }

      fetchMeals().catch((error) => {
        setIsLoading(false)
        setHttpError(error.message)
      })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p >Loading...</p>
      </section>
    )
  }

  if (httpError) {
    <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }
    const mealsList = meals.map((meal) => (
    <MealItem 
        key = {meal.id} 
        id = {meal.id}
        name = {meal.name}
        description = {meal.description}
        price = {meal.price} 
        />
        ))

  return (
    <section className={classes.meals}>
        <Card>
        <ul> {mealsList} </ul>
        </Card>
    </section>
  )
}

export default AvailableMeal