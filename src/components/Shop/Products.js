import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
	{
		id: "p1",
		price: 6,
		title: "My First Book",
		description: "First book I ever wrote"
	},
	{
		id: "p2",
		price: 10.99,
		title: "Nice little pen",
		description: "Nice pen to write with"
	},
	{
		id: "p3",
		price: 4.99,
		title: "Phone case",
		description: "Protect your phone with this case"
	}
]

const context = DUMMY_PRODUCTS.map(data => {
	return <ProductItem
		key = {data.id}
		id = {data.id}
		price = {data.price}
		title = {data.title}
		description = {data.description}
	/>
})

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
    	{context}
      </ul>
    </section>
  );
};

export default Products;
