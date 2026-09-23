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
import products from '../data/products';

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
