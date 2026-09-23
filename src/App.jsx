import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import CartPage from './components/CartPage';
import HomePage from './components/HomePage';
import CheckoutPage from './components/CheckoutPage';
import ProductPage from './components/ProductPage';
import { CartProvider } from './context/CartContext';
import useCart from './context/useCart';
import './App.css';

function CartButton() {
	const { totalItems } = useCart();

	return (
		<Button
			component={Link}
			to='/cart'
			variant='contained'
			color='primary'
			startIcon={
				<Badge
					badgeContent={totalItems}
					color='error'
				>
					<ShoppingCartIcon />
				</Badge>
			}
			className='rounded-full px-6 shadow-none hover:shadow-md'
		>
			Cart
		</Button>
	);
}

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<Box className='flex min-h-screen flex-col bg-gray-50'>
					<AppBar
						position='sticky'
						sx={{ backgroundColor: 'white', color: 'text.primary' }}
						elevation={1}
					>
						<Toolbar className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
							<Typography
								variant='h6'
								component={Link}
								to='/'
								className='grow font-bold tracking-tight text-inherit no-underline'
							>
								E-Commerce Asshley Gozar INF233
							</Typography>

							<Box className='flex items-center gap-2 sm:gap-4'>
								<Button
									component={Link}
									to='/'
									color='inherit'
									className='font-medium'
								>
									Home
								</Button>

								<Button
									component={Link}
									to='/checkout'
									color='inherit'
									className='font-medium'
								>
									Checkout
								</Button>

								<CartButton />
							</Box>
						</Toolbar>
					</AppBar>

					<Box
						component='main'
						className='grow'
					>
						<Routes>
							<Route
								path='/'
								element={<HomePage />}
							/>
							<Route
								path='/cart'
								element={<CartPage />}
							/>
							<Route
								path='/checkout'
								element={<CheckoutPage />}
							/>
							<Route
								path='/product/:id'
								element={<ProductPage />}
							/>
						</Routes>
					</Box>
				</Box>
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
