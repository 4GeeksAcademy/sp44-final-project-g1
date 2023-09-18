const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// token: null,
			user: null,
			products: [],
			categories: [],
			products_ghop: [],
			selectProduct: [],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// login: async () => {
			// 	const options = {
			// 		method: 'POST',
			// 		header: {
			// 			'Accept': 'application/json',
			// 			'Content-Type': 'application/json'
			// 		},
			// 		body: JSON.stringify({"id_user_ghop": idUserGhop})
			// 		}
			// },

			selectProduct: (product) => {
				const { selectProduct } = getStore();
				const productIndex = selectProduct.findIndex((p) => p.name === product.name);
			
				if (productIndex === -1) {
				  // Si el producto no está en la lista, agrégalo
				  setStore({ selectProduct: [...selectProduct, product] });
				} else {
				  alert('The product is already in the purchase cart')
				}
			  },

			login: () => {
				setStore({ user: true })
			},

			getProducts: async () => {
				// 1. Definir options
				const requestsOpts = {
					method: "GET",
					//1.1 Indicar que se espera una respuesta en formato JSON y que los datos enviados también estarán en formato JSON
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
				};

				try {
					// 2. realiza la solicitud a la API
					const response = await fetch(process.env.BACKEND_URL + "/api/products", requestsOpts);

					if (response.ok) {
						const data = await response.json();

						//2.1 Actualiza el estado del almacenamiento local y el estado de la aplicación
						localStorage.setItem('products', JSON.stringify(data.products));
						setStore({ products: data.products }); // Actualiza el estado de la aplicación
					} else {
						console.log('Error: ', response.status, response.statusText);
					}
				} catch (error) {
					console.error('Error: ', error);
				}
			},

			getCategories: async () => {
				// 1. Definir options
				const requestsOpts = {
					method: "GET",
					//1.1 Indicar que se espera una respuesta en formato JSON y que los datos enviados también estarán en formato JSON
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
				};

				try {
					// 2. realiza la solicitud a la API
					const response = await fetch(process.env.BACKEND_URL + "/api/category", requestsOpts);

					if (response.ok) {
						const data = await response.json();

						//2.1 Actualiza el estado del almacenamiento local y el estado de la aplicación
						localStorage.setItem('categories', JSON.stringify(data.categories));
						setStore({ categories: data.categories }); // Actualiza el estado de la aplicación
					} else {
						console.log('Error: ', response.status, response.statusText);
					}
				} catch (error) {
					console.error('Error: ', error);
				}
			},

			getProductsGhop: async () => {
				// 1. Definir options
				const requestsOpts = {
					method: "GET",
					//1.1 Indicar que se espera una respuesta en formato JSON y que los datos enviados también estarán en formato JSON
					headers: {
						'X-Api-Key': process.env.API_KEY_GHOP,
						// 'Accept': 'application/json',
						// 'Content-Type': 'application/json'
					},
				};

				try {
					// 2. realiza la solicitud a la API
					const response = await fetch(process.env.BACKEND_URL_GHOP + "/products", requestsOpts);

					if (response.ok) {
						const data = await response.text();

						//2.1 Actualiza el estado del almacenamiento local y el estado de la aplicación
						// localStorage.setItem('products_ghop', JSON.stringify(data));
						setStore({ products_ghop: data }); // Actualiza el estado de la aplicación
					} else {
						console.log('Error: ', response.status, response.statusText);
					}
				} catch (error) {
					console.error('Error: ', error);
				}
			},			
		}
	};
};

export default getState;
