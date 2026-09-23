import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import products from '../data/products';

export default function ProductPage() {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const product =
		location.state?.product ?? products.find(item => item.id === Number(id));

	if (!product) {
		return (
			<Container className='py-12'>
				<Typography
					variant='h4'
					component='h1'
					gutterBottom
				>
					Product not found
				</Typography>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate('/')}
				>
					Back to products
				</Button>
			</Container>
		);
	}

	const isInStock = product.stock > 0;

	return (
		<Container
			maxWidth='lg'
			className='py-8 sm:py-12'
		>
			<Button
				startIcon={<ArrowBackIcon />}
				onClick={() => navigate(-1)}
				className='mb-6'
			>
				Back to products
			</Button>

			<Card className='overflow-hidden shadow-md'>
				<div className='grid grid-cols-1 md:grid-cols-2'>
					<img
						src={product.image}
						alt={product.name}
						className='h-full min-h-80 w-full object-cover md:min-h-136'
					/>
					<CardContent className='flex flex-col justify-center gap-5 p-6 sm:p-10'>
						{product.category && (
							<Chip
								label={product.category}
								color='primary'
								variant='outlined'
								className='self-start'
							/>
						)}
						<Typography
							variant='h3'
							component='h1'
							className='font-bold'
						>
							{product.name}
						</Typography>
						<Typography
							variant='h4'
							color='primary'
							className='font-bold'
						>
							₱{product.price.toFixed(2)}
						</Typography>
						<Divider />
						<Typography
							variant='body1'
							color='text.secondary'
						>
							{product.description}
						</Typography>
						<Stack
							direction='row'
							spacing={1}
							alignItems='center'
						>
							{isInStock ? (
								<CheckCircleIcon color='success' />
							) : (
								<Inventory2Icon color='disabled' />
							)}
							<Typography color={isInStock ? 'success.main' : 'text.secondary'}>
								{isInStock
									? `${product.stock} available in stock`
									: 'Currently out of stock'}
							</Typography>
						</Stack>
					</CardContent>
				</div>
			</Card>
		</Container>
	);
}
