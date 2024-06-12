import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CanteenPage = () => {
const { canteenId } = useParams();
const canteenDetails = useSelector(state => state.canteen.canteenDetails);

if (!canteenDetails || canteenDetails.id !== parseInt(canteenId)) {
return <div>Canteen not found</div>;
}

const canteenDishes = canteenDetails.dishes;

return (
<div className="canteen-page">
<h1>{canteenDetails.name}</h1>
<p>{canteenDetails.description}</p>
<div>
<h2>Search for dishes</h2>
{/* Implement your search bar and functionality here */}
</div>
<div>
<h2>Dishes</h2>
<ul>
{canteenDishes.map(dish => (
    <li key={dish.id}>{dish.name}</li>
))}
</ul>
</div>
</div>
);
};

export default CanteenPage;
