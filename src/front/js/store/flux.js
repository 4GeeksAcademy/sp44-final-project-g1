const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			login: false,
			block: false,
			token: null,
			user: { id: undefined, name: '' },
			products: [],
			categories: [],
			selectProduct: [],
			totalCesta: 0,
			purchaseCarts: {},
			openCarts: false
		},

		actions: {

			blockApp: (value) => {
				setStore({ block: value })
			},

			logOutApp: (value) => {
				setStore({
					login: value,
					user: {},
				})
			},

			login: async (vendorQr) => {
				const requestsOpts = {
					// 1. Definir las opciones para la solicitud POST
					method: 'POST',
					headers: {
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
						setStore({ 
							categories: data.results.categories,
							products: data.results.products,
							user: data.results.user,
							login: true
						});
					} else {
						// 2.3 Se verifica si la respuesta del servidor tiene un estado diferente de 200 y si es asi generar alerta y return False
						alert('There has been some error')
					}
					// 3. Si en cualquier punto se produce un error, se captura el error y se muestra en la consola.
				} catch (error) {
					console.error('Login failed', error);
				}
			},

			selectProduct: (product, increase) => {
				const { selectProduct } = getStore();
				// Verificar si el producto ya existe en la lista
				const productExists = selectProduct.find((p) => p.name === product.name);

				if (!productExists) {
					// Si el producto no está en la lista agrégalo con cantidad 1 al principio de la lista.
					setStore({
						selectProduct: [{ ...product, quantity: 1 }, ...selectProduct], 
						totalCesta: getStore().totalCesta + 1,
					});
				} else if (productExists && increase) {
					// Si el producto ya está en la lista y se está incrementando, aumenta su cantidad en 1
					const updatedSelectProduct = selectProduct.map((p) => {
						if (p.name === product.name) {
							return { ...p, quantity: p.quantity + 1 };
						}
						return p;
					});

					setStore({
						selectProduct: updatedSelectProduct,
						totalCesta: getStore().totalCesta + 1,
					});
				} else if (productExists && !increase && productExists.quantity > 1) {
					// Si el producto está en la lista, se está decrementando y su cantidad es mayor que 1, disminuye su cantidad en 1
					const updatedSelectProduct = selectProduct.map((p) => {
						if (p.name === product.name) {
							return { ...p, quantity: p.quantity - 1 };
						}
						return p;
					});
					setStore({
						selectProduct: updatedSelectProduct,
						totalCesta: getStore().totalCesta - 1,
					});
				} else if (productExists && !increase && productExists.quantity === 1) {
					console.log(selectProduct)
					// Si el producto está en la lista, se está decrementando y su cantidad es 1, elimina el producto de la lista
					const updatedSelectProduct = selectProduct.filter((p) => p.name !== product.name);
					setStore({
						selectProduct: updatedSelectProduct,
						totalCesta: getStore().totalCesta - 1,
					});
				}
			},

			getPurchaseCarts: async (customerQr) => {
				const requestsOpts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "customerQr": customerQr })
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/purchase-carts", requestsOpts);

					if (resp.status === 200) {
						const data = await resp.json();
						setStore({
							purchaseCarts: data.results[0],
							openCarts: true
						})
					} else {
						alert('There has been some error')
					}
				} catch (error) {
					console.error('Error:', error)
				}
			},

			closeCarts: async (cartId, customerId, products) => {
				const requestsOpts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "products": products, "customerId": customerId })
				}

				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/purchase-carts/" + cartId, requestsOpts);

					if (resp.status === 200) {
						
						const data = resp.json();
						setStore({
							selectProduct: [],
							totalCesta: 0,
							purchaseCarts: {},
							openCarts: false
						})
						return true;
					} else {
						alert('There has been some error')
					}
				} catch (error) {
					console.error('Error:', error)
				}
				return false;
			}
		}
	};
};

export default getState;
