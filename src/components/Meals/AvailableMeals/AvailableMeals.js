import { useState, useEffect } from 'react';
import Card from '../../UI/Card/Card'
import MealItem from '../MealItem/MealItem';
import classes from './AvailableMeals.module.css';

import useHttp from '../../../hooks/useHttp';


const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const { isLoading, error, sendRequest: fetchMeals } = useHttp();

	useEffect(() => {
		const transformData = (data) => {
			const loadedMeals = [];
			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price
				})
			}
			setMeals(loadedMeals)

		}
		fetchMeals(
			{ url: 'https://learn-react-c35a1-default-rtdb.firebaseio.com/meals.json' },
			transformData
		)

	}, [fetchMeals])

	if (isLoading) {
		return <section className={classes.MealsLoading}>
			<p>Loading...</p>
		</section>
	}

	if (error) {
		return <section className={classes.MealsError}>
			<p>{error}</p>
		</section>
	}

	const mealList = meals.map(meal => {
		return (
			<MealItem
				key={meal.id}
				id={meal.id}
				name={meal.name}
				description={meal.description}
				price={meal.price}
			/>
		)
	});
	return (
		<section className={classes.meals}>
			<Card>
				<ul>
					{mealList}
				</ul>
			</Card>
		</section>
	)
}

export default AvailableMeals