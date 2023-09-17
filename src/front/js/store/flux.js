const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: false,
			products: [],
			categories: [],
			products_ghop: [],
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

			Login: () => {
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

			// getMessage: async () => {
			// 	try {

			// 		const requestOptions = {
			// 			method: "GET",
			// 			headers: {
			// 				'Accept': 'application/json',
			// 			}
			// 		};

			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello", requestOptions)
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
