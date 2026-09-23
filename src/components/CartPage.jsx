import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useCart from '../context/useCart';

export default function CartPage() {
	const { cartItems, updateQuantity, removeFromCart } = useCart();
	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	if (cartItems.length === 0) {
		return (
			<Container
				maxWidth='md'
				className='py-12'
			>
				<Alert
					severity='info'
					icon={<ShoppingCartCheckoutIcon />}
				>
					Your cart is currently empty.
				</Alert>
				<Button
					component={Link}
					to='/'
					variant='contained'
					className='mt-6'
				>
					Continue shopping
				</Button>
			</Container>
		);
	}

	return (
		<Container
			maxWidth='lg'
			className='py-8 sm:py-12'
		>
			<Typography
				variant='h4'
				component='h1'
				className='mb-6 font-bold'
			>
				Shopping cart
			</Typography>
			<div className='grid gap-6 lg:grid-cols-[1fr_22rem]'>
				<Stack spacing={2}>
					{cartItems.map(item => (
						<Card key={item.id}>
							<CardContent className='flex flex-col gap-4 sm:flex-row sm:items-center'>
								<img
									src={item.image}
									alt={item.name}
									className='h-28 w-full rounded object-cover sm:w-32'
								/>
								<Box className='min-w-0 grow'>
									<Typography
										variant='h6'
										className='font-semibold'
									>
										{item.name}
									</Typography>
									<Typography color='text.secondary'>
										₱{item.price.toFixed(2)} each
									</Typography>
									<Stack
										direction='row'
										alignItems='center'
										className='mt-3'
									>
										<IconButton
											size='small'
											aria-label={`Decrease ${item.name} quantity`}
											disabled={item.quantity === 1}
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
										>
											<RemoveIcon />
										</IconButton>
										<Typography className='min-w-8 text-center'>
											{item.quantity}
										</Typography>
										<IconButton
											size='small'
											aria-label={`Increase ${item.name} quantity`}
											disabled={item.quantity >= item.stock}
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
										>
											<AddIcon />
										</IconButton>
									</Stack>
								</Box>
								<Stack
									alignItems='flex-end'
									spacing={1}
								>
									<Typography
										variant='h6'
										color='primary'
										className='font-bold'
									>
										₱{(item.price * item.quantity).toFixed(2)}
									</Typography>
									<IconButton
										color='error'
										aria-label={`Remove ${item.name}`}
										onClick={() => removeFromCart(item.id)}
									>
										<DeleteIcon />
									</IconButton>
								</Stack>
							</CardContent>
						</Card>
					))}
				</Stack>

				<Card className='h-fit'>
					<CardContent>
						<Typography
							variant='h6'
							className='font-bold'
						>
							Order summary
						</Typography>
						<Divider className='my-4' />

						<Stack
							direction='row'
							justifyContent='space-between'
							spacing={2}
							className='mt-3'
						>
							<Typography
								variant='h6'
								className='font-bold'
							>
								Total
							</Typography>
							<Typography
								variant='h6'
								color='primary'
								className='font-bold'
							>
								₱{total.toFixed(2)}
							</Typography>
						</Stack>
						<Button
							component={Link}
							to='/checkout'
							fullWidth
							variant='contained'
							className='mt-6'
							startIcon={<ShoppingCartCheckoutIcon />}
						>
							Checkout
						</Button>
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
