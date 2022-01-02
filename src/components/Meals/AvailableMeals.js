import React, { useState, useEffect } from "react";

import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
	const [mealData, setMealData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	const fetchMealsHandler = async () => {
		try {
			const response = await fetch(
				"https://react-http-9b75a-default-rtdb.firebaseio.com/meals.json"
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();

			const loadedMeals = [];
			for (const key in data) {
				loadedMeals.push({
					id: key,
					...data[key],
				});
			}

			setMealData(loadedMeals);

			setIsLoading(false);
		} catch (err) {
			setHttpError(err.message);
		}
	};

	useEffect(() => {
		fetchMealsHandler();
	}, []);

	const mealsList = mealData.map((meal) => (
		<MealItem key={meal.id} meal={meal} />
	));

	if (httpError) {
		return (
			<section className={classes.hasError}>
				<p>{httpError}</p>
			</section>
		);
	}

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
