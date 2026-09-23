import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';

const products = [
	{
		id: 1,
		image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
		name: 'Wireless Noise-Canceling Headphones',
		category: 'Electronics',
		price: 199,
		description:
			'High-fidelity audio with active noise cancellation and up to 30 hours of battery life.',
		stock: 45,
	},
	{
		id: 2,
		image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
		name: 'Minimalist Smartphone Stand',
		category: 'Accessories',
		price: 25,
		description:
			'Sleek aluminum desktop stand compatible with all standard smartphone models.',
		stock: 120,
	},
	{
		id: 3,
		image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
		name: 'Ergonomic Mechanical Keyboard',
		category: 'Electronics',
		price: 120,
		description:
			'RGB backlit mechanical keyboard with tactile switches for typing comfort.',
		stock: 18,
	},
	{
		id: 4,
		image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
		name: 'Insulated Stainless Steel Water Bottle',
		category: 'Fitness & Outdoors',
		price: 32,
		description:
			'Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12 hours.',
		stock: 0,
	},
	{
		id: 5,
		image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
		name: 'Vintage Polarizing Sunglasses',
		category: 'Fashion',
		price: 45,
		description:
			'Classic unisex frame design featuring UV400 protective polarized lenses.',
		stock: 82,
	},
	{
		id: 6,
		image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
		name: 'Smart Fitness Watch',
		category: 'Wearables',
		price: 150,
		description:
			'Tracks daily activity, heart rate, sleep metrics, and displays phone notifications.',
		stock: 24,
	},
	{
		id: 7,
		image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
		name: 'Portable Bluetooth Speaker',
		category: 'Electronics',
		price: 75,
		description:
			'Waterproof wireless speaker delivering deep bass and 12-hour continuous play.',
		stock: 60,
	},
	{
		id: 8,
		image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
		name: 'Water-Resistant Canvas Backpack',
		category: 'Bags & Travel',
		price: 68,
		description:
			'Durable daily commute backpack with a padded sleeve fitting laptops up to 15 inches.',
		stock: 5,
	},
	{
		id: 9,
		image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
		name: 'Lightweight Running Shoes',
		category: 'Footwear',
		price: 110,
		description:
			'Breathable mesh upper with cushioned soles designed for long-distance comfort.',
		stock: 33,
	},
	{
		id: 10,
		image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
		name: 'Handcrafted Leather Journal',
		category: 'Stationery',
		price: 38,
		description:
			'Genuine leather cover bound with 200 pages of thick, acid-free unlined paper.',
		stock: 110,
	},
	{
		id: 11,
		image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
		name: 'LED Desk Lamp with Wireless Charger',
		category: 'Home & Living',
		price: 55,
		description:
			'Dimmable desk light with adjustable color temperatures and an integrated Qi charging pad.',
		stock: 14,
	},
	{
		id: 12,
		image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500',
		name: 'Organic Whole Bean Coffee (12oz)',
		category: 'Food & Beverage',
		price: 18,
		description:
			'Medium roast arabica coffee beans sourced sustainably with chocolate and citrus notes.',
		stock: 95,
	},
];

export default function HomePage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [visibleCount, setVisibleCount] = useState(8);
	const categories = [
		'All',
		...new Set(products.map(product => product.category)),
	];
	const filteredProducts = products.filter(product => {
		const matchesName = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === 'All' || product.category === selectedCategory;

		return matchesName && matchesCategory;
	});
	const visibleProducts = filteredProducts.slice(0, visibleCount);

	const handleSearchChange = event => {
		setSearchTerm(event.target.value);
		setVisibleCount(8);
	};

	const handleCategoryChange = event => {
		setSelectedCategory(event.target.value);
		setVisibleCount(8);
	};

	return (
		<Box className='min-h-screen bg-gray-50 py-10'>
			<Container maxWidth='xl'>
				<Box className='mb-10 flex flex-col items-center text-center'>
					<Typography
						variant='h3'
						component='h1'
						color='text.primary'
						align='center'
						className='font-bold tracking-tight'
						gutterBottom
					>
						Welcome to NU MOA Sales Booth!
					</Typography>
					<Typography
						variant='subtitle1'
						color='text.secondary'
						align='center'
						className='mx-auto max-w-2xl'
					>
						Explore niyo products namin mura lang and good quality pa! Thank you
						for shopping with us!
					</Typography>
				</Box>

				<Box className='mb-8 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row'>
					<TextField
						fullWidth
						label='Search products by name'
						value={searchTerm}
						onChange={handleSearchChange}
						variant='outlined'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon color='action' />
								</InputAdornment>
							),
						}}
					/>
					<FormControl fullWidth>
						<InputLabel id='category-filter-label'>Category</InputLabel>
						<Select
							labelId='category-filter-label'
							value={selectedCategory}
							label='Category'
							onChange={handleCategoryChange}
							startAdornment={
								<FilterListIcon
									color='action'
									className='mr-2'
								/>
							}
						>
							{categories.map(category => (
								<MenuItem
									key={category}
									value={category}
								>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<section className='mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center'>
					{visibleProducts.map(pr => (
						<ProductCard
							key={pr.id}
							id={pr.id}
							category={pr.category}
							description={pr.description}
							image={pr.image}
							name={pr.name}
							price={pr.price}
							stock={pr.stock}
						/>
					))}
				</section>

				{visibleProducts.length === 0 && (
					<Typography
						color='text.secondary'
						align='center'
						className='py-12'
					>
						No products match your search.
					</Typography>
				)}

				{visibleCount < filteredProducts.length && (
					<Box className='flex justify-center py-10'>
						<Button
							variant='contained'
							color='primary'
							onClick={() => setVisibleCount(count => count + 8)}
						>
							View more products
						</Button>
					</Box>
				)}
			</Container>
		</Box>
	);
}
