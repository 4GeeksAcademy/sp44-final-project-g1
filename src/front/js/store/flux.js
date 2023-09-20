const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			login: false,
			block: false,
			token: null,
			user: { id: undefined, name: '' },
			products: [],
			categories: [],
			// productsGhop: [],
			selectProduct: [],
			totalCesta: 0,
		},

		actions: {

			showModalBlock: () => {

				const { block } = getStore();

			},

			login: async (vendorQr) => {

				const requestsOpts = {
					// 1. Definir las opciones para la solicitud POST
					method: 'POST',
					headers: {
						// 'Accept': 'application/json',
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "vendorQr": vendorQr })
				};

				try {
					// 2. Realizar la solicitud POST al endpoint de api/open-store que tiene toda la tienda con products y categories
					const resp = await fetch(process.env.BACKEND_URL + "api/open-store", requestsOpts);

					//2.1 Si la respuesta del servidor tiene un estado 200, se obtiene el cuerpo de la respuesta utilizando resp.json(). 
					if (resp.status === 200) {

						const data = await resp.json();
						// 2.2 Actualizar en setSore todos los store (products, categories, user {id, name})

						// setStore( 'token', data.results.token)
						setStore({ categories: data.results.categories })
						setStore({ products: data.results.products });
						setStore({ user: data.results.user });
						setStore({ login: true });

					} else {
						// 2.3 Se verifica si la respuesta del servidor tiene un estado diferente de 200 y si es asi generar alerta y return False
						alert('There has been some error')

					}

					// 3. Si en cualquier punto se produce un error, se captura el error y se muestra en la consola.
				} catch (error) {
					console.error('Login failed', error);
				}
			},

			selectProduct: (product) => {
				const { selectProduct} = getStore();

				// Verificar si el producto ya existe en la lista
				const productExists = selectProduct.find((p) => p.name === product.name);

				

				if (!productExists) {
					// Si el producto no está en la lista, agrégalo con cantidad 1
					setStore({
						selectProduct: [...selectProduct, { ...product, quantity: 1 }],
					})

				} else {
					alert('Producto ya existe')
					
				}
			},


			// logout: () => {
			// 	// Elimina el token almacenado en la session y lo reemplaza por null para tener que volver a logearse
			// 	setStore({ login: false })
			// },



			// selectProduct: (product, increase) => {
			// 	const { selectProduct } = getStore();

			// 	// Verificar si el producto ya existe en la lista
			// 	const productExists = selectProduct.find((p) => p.name === product.name);

			// 	if (!productExists) {
			// 		// Si el producto no está en la lista y se está incrementando, agrégalo con cantidad 1
			// 		setStore({
			// 			selectProduct: [...selectProduct, { ...product, quantity: 1 }],
			// 			totalCesta: getStore().totalCesta + 1,
			// 		});

			// 	} else if (productExists && increase) {
			// 		// Si el producto ya está en la lista y se está incrementando, aumenta su cantidad en 1
			// 		const updatedSelectProduct = selectProduct.map((p) => {
			// 			if (p.name === product.name) {
			// 				return { ...p, quantity: p.quantity + 1 };
			// 			}
			// 			return p;
			// 		});

			// 		setStore({
			// 			selectProduct: updatedSelectProduct,
			// 			totalCesta: getStore().totalCesta + 1,
			// 		});
			// 	} else if (productExists && !increase && productExists.quantity > 1) {
			// 		// Si el producto está en la lista, se está decrementando y su cantidad es mayor que 1, disminuye su cantidad en 1
			// 		const updatedSelectProduct = selectProduct.map((p) => {
			// 			if (p.name === product.name) {
			// 				return { ...p, quantity: p.quantity - 1 };
			// 			}
			// 			return p;
			// 		});

			// 		setStore({
			// 			selectProduct: updatedSelectProduct,
			// 			totalCesta: getStore().totalCesta - 1,
			// 		});
			// 	} else if (productExists && !increase && productExists.quantity === 1) {
			// 		// Si el producto está en la lista, se está decrementando y su cantidad es 1, elimina el producto de la lista
			// 		const updatedSelectProduct = selectProduct.filter((p) => p.name !== product.name);

			// 		setStore({
			// 			selectProduct: updatedSelectProduct,
			// 			totalCesta: getStore().totalCesta - 1,
			// 		});
			// 	}
			// },


			// getProducts: async () => {
			// 	// 1. Definir options
			// 	const requestsOpts = {
			// 		method: "GET",
			// 		//1.1 Indicar que se espera una respuesta en formato JSON y que los datos enviados también estarán en formato JSON
			// 		headers: {
			// 			'Accept': 'application/json',
			// 			'Content-Type': 'application/json'
			// 		},
			// 	};

			// 	try {
			// 		// 2. realiza la solicitud a la API
			// 		const response = await fetch(process.env.BACKEND_URL + "/api/products", requestsOpts);

			// 		if (response.ok) {
			// 			const data = await response.json();

			// 			//2.1 Actualiza el estado del almacenamiento local y el estado de la aplicación
			// 			localStorage.setItem('products', JSON.stringify(data.products));
			// 			setStore({ products: data.products }); // Actualiza el estado de la aplicación
			// 		} else {
			// 			console.log('Error: ', response.status, response.statusText);
			// 		}
			// 	} catch (error) {
			// 		console.error('Error: ', error);
			// 	}
			// },

			// getCategories: async () => {
			// 	// 1. Definir options
			// 	const requestsOpts = {
			// 		method: "GET",
			// 		//1.1 Indicar que se espera una respuesta en formato JSON y que los datos enviados también estarán en formato JSON
			// 		headers: {
			// 			'Accept': 'application/json',
			// 			'Content-Type': 'application/json'
			// 		},
			// 	};

			// 	try {
			// 		// 2. realiza la solicitud a la API
			// 		const response = await fetch(process.env.BACKEND_URL + "/api/category", requestsOpts);

			// 		if (response.ok) {
			// 			const data = await response.json();

			// 			//2.1 Actualiza el estado del almacenamiento local y el estado de la aplicación
			// 			localStorage.setItem('categories', JSON.stringify(data.categories));
			// 			setStore({ categories: data.categories }); // Actualiza el estado de la aplicación
			// 		} else {
			// 			console.log('Error: ', response.status, response.statusText);
			// 		}
			// 	} catch (error) {
			// 		console.error('Error: ', error);
			// 	}
			// },

			// getProductsGhop: async () => {
			// 	// 1. Definir options
			// 	const requestsOpts = {
			// 		method: "GET",
			// 		//1.1 Indicar que se espera una respuesta en formato JSON y que los datos enviados también estarán en formato JSON
			// 		headers: {
			// 			'X-Api-Key': process.env.API_KEY_GHOP,
			// 			'X-Language': 'es-ES'
			// 		},
			// 	};

			// 	try {
			// 		// 2. realiza la solicitud a la API
			// 		const response = await fetch(process.env.BACKEND_URL_GHOP + "/products-ghop", requestsOpts);

			// 		if (response.ok) {
			// 			const data = await response.text();

			// 			//2.1 Actualiza el estado del almacenamiento local y el estado de la aplicación
			// 			localStorage.setItem('productsGhop', JSON.stringify(data));
			// 			setStore({ productsGhop: data }); // Actualiza el estado de la aplicación
			// 		} else {
			// 			console.log('Error: ', response.status, response.statusText);
			// 		}
			// 	} catch (error) {
			// 		console.error('Error: ', error);
			// 	}
			// },
		}
	};
};

export default getState;
