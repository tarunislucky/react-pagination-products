import { useEffect, useState } from "react";
import "./App.css";

function App() {
	console.log("APP");
	const [products, setProducts] = useState();
	const [totalPages, setTotalPages] = useState();
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const sendRequest = async () => {
			const response = await fetch(
				`https://dummyjson.com/products?limit=${limit}&skip=${
					(currentPage - 1) * limit
				}&select=title,price`,
				{
					method: "GET",
				}
			);
			const data = await response.json();
			return data;
		};
		sendRequest().then(({ products, total }) => {
			setProducts(products);
			setTotalPages(Math.ceil(total / limit));
		});
	}, [currentPage, limit]);

	const paginationBtnHandler = (e) => {
		setCurrentPage(Number(e.target.textContent));
	};

	return (
		<>
			<div className="productListContainer">
				{products &&
					products.map((product) => {
						return (
							<div className="productContainer" key={product.id}>
								<p>{product.id}</p>
								<p>{product.title}</p>
								<p>{product.price}</p>
							</div>
						);
					})}
			</div>
			<div className="paginationContainer">
				{products &&
					[...Array(totalPages)].map((el, index) => (
						<button onClick={paginationBtnHandler}> {index + 1}</button>
					))}
			</div>
		</>
	);
}

export default App;
