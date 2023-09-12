const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: false,
			products: [],
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
				if (localStorage.getItem('products') !== null) {
					// Si los datos de los products están en el almacenamiento local, obtén los datos de allí
					const productsFromStorage = JSON.parse(localStorage.getItem('products'));
					setStore({ products: productsFromStorage });

				} else {
					// Si no entonces realiza la solicitud a la API
					const response = await fetch(process.env.BACKEND_URL + "/api/products");

					if (response.ok) {
						const data = await response.json();
						localStorage.setItem('products', JSON.stringify(data.products));

						// Actualiza el estado del store con los datos de los productos obtenidos
						setStore({ products: data.products });
					} else {
						console.log('Error: ', response.status, response.statusText);
					}

				}
			},

			getMessage: async () => {
				try {

					const requestOptions = {
						method: "GET",
						headers: { "Content-Type": "application/json" },
						redirect: 'follow'
					};

					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", requestOptions)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
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
