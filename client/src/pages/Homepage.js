import React from "react";
import "./Homepage.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const [mealList, setMealList] = useState([]);
  const [filteredMealList, setFilteredMealList] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState([]);

  const fetchMeal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/server/api/meal/findmeal/${page}/3`
      );
      setMealList(response.data.foods);
      setFilteredMealList(response.data.foods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, [page]);

  useEffect(() => {
    filterMeals();
  }, [filters, mealList]);

  const filterMeals = () => {
    if (filters.length === 0) {
      setFilteredMealList(mealList);
    } else {
      const filtered = mealList.filter((meal) =>
        filters.every((filter) => meal.labels.some((label) => label.label === filter))
      );
      setFilteredMealList(filtered);
    }
  };

  const handleButtonClick = (filter) => {
    if (filters.includes(filter)) {
      removeFilter(filter);
    } else {
      addFilter(filter);
    }
  };

  const addFilter = (filter) => {
    setFilters([...filters, filter]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const addMeal = (meal) => {
    if (!selectedMeal.includes(meal)) {
      setSelectedMeal([...selectedMeal, meal]);
    }
  };

  const removeMeal = (mealId) => {
    setSelectedMeal(selectedMeal.filter((meal) => meal.id !== mealId));
  };

  const buy = () => {
    const total = selectedMeal.reduce((acc, meal) => acc + meal.price, 0);
    alert(`Your total is $${total}.`);
  };

  return (
    <div className="body">
    <div className="container">
      <div className="content">
        <div className="left-main">
          <div className="left-categories">
            {[
              "Pork",
              "Seafood",
              "Kids",
              "Beef",
              "Chicken",
              "Vegetarian",
              "Breakfast",
            ].map((category) => (
              <button
                key={category}
                onClick={() => handleButtonClick(category)}
                className={filters.includes(category) ? "active" : ""}
              >
                {category}
              </button>
            ))}
          </div>
          <hr />
          <div className="food-cards">
            <div className="meals">
              {filteredMealList.map((meal) => (
                <div className="meal-item" key={meal.id}>
                  <div className="meal-image">
                    <img src={meal.img} alt={meal.title} />
                  </div>
                  <div className="meal-data">
                    {meal.labels.map((label) => (
                      <p key={label._id}>Category: {label.label}</p>
                    ))}
                    <h3>{meal.title}</h3>
                    <p>Starter: {meal.starter}</p>
                    <p>Desert: {meal.desert}</p>
                    <div className="meal-price-select">
                      <h3>Price: ${meal.price}</h3>
                      <button onClick={() => addMeal(meal)}>Select</button>
                    </div>
                    <hr />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="left-pagination">
            <button onClick={() => setPage(1)}>1</button>
            <button onClick={() => setPage(2)}>2</button>
            <button onClick={() => setPage(3)}>3</button>
          </div>
        </div>
        <div className="right-main">
          <h2>Selected Meals</h2>
          {selectedMeal.length === 0 ? (
            <p>No meals selected.</p>
          ) : (
            selectedMeal.map((meal) => (
              <div className="selected-meal-item" key={meal.id}>
                <img src={meal.img} alt={meal.title} className="selected-meal-image" />
                <h3>{meal.title}</h3>
                <p>Price: ${meal.price}</p>
                <button onClick={() => removeMeal(meal.id)}>Remove</button>
              </div>
            ))
          )}
          {selectedMeal.length > 0 && (
            <div>
              <hr />
              <button onClick={buy}>Buy</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Homepage;
