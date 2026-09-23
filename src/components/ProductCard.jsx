import PropTypes from 'prop-types';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useCart from '../context/useCart';

function ProductCard({ id, image, name, price, description, category, stock }) {
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const product = { id, image, name, price, description, category, stock };

	const openProduct = () => {
		navigate(`/product/${id}`, {
			state: {
				product: { id, image, name, price, description, category, stock },
			},
		});
	};

	return (
		<Card
			onClick={openProduct}
			onKeyDown={event => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					openProduct();
				}
			}}
			role='link'
			tabIndex={0}
			className='flex h-full w-full max-w-sm cursor-pointer flex-col overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg'
		>
			<CardMedia
				component='img'
				image={image}
				alt={name}
				className='h-56 w-full object-cover'
			/>
			<CardContent className='flex min-h-48 flex-col gap-2'>
				<Typography
					component='h2'
					variant='h6'
					className='font-semibold'
				>
					{name}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					className='line-clamp-3'
				>
					{description}
				</Typography>
				<Typography
					variant='h6'
					color='primary'
					className='mt-auto font-bold'
				>
					₱{price.toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions className='justify-end px-4 pb-4'>
				<Tooltip title='Add to cart'>
					<IconButton
						color='primary'
						aria-label={`Add ${name} to cart`}
						disabled={stock === 0}
						onClick={event => {
							event.stopPropagation();
							addToCart(product);
						}}
					>
						<AddShoppingCartIcon />
					</IconButton>
				</Tooltip>
			</CardActions>
		</Card>
	);
}

ProductCard.propTypes = {
	id: PropTypes.number.isRequired,
	image: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	description: PropTypes.string,
	category: PropTypes.string,
	stock: PropTypes.number,
};

export default ProductCard;
