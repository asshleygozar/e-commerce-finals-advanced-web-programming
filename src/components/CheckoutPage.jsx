import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Navigate, Link } from 'react-router-dom';
import useCart from '../context/useCart';

const initialForm = {
	fullName: '',
	email: '',
	phone: '',
	deliveryAddress: '',
	paymentMethod: 'Cash on Delivery',
};

const validateForm = form => ({
	fullName: form.fullName.trim() ? '' : 'Full name is required.',
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
		? ''
		: 'Enter a valid email address.',
	phone: /^\+63\d{10}$/.test(form.phone)
		? ''
		: 'Use the format +63 followed by 10 digits.',
	deliveryAddress: form.deliveryAddress.trim()
		? ''
		: 'Delivery address is required.',
	paymentMethod:
		form.paymentMethod === 'Cash on Delivery'
			? ''
			: 'Cash on Delivery is the only available payment method.',
});

export default function CheckoutPage() {
	const { cartItems, clearCart } = useCart();
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	if (submitted) {
		return (
			<Container
				maxWidth='sm'
				className='py-12'
			>
				<Card>
					<CardContent className='flex flex-col items-center gap-4 p-8 text-center'>
						<CheckCircleIcon
							color='success'
							sx={{ fontSize: 64 }}
						/>
						<Typography
							variant='h4'
							component='h1'
							className='font-bold'
						>
							Order confirmed
						</Typography>
						<Typography color='text.secondary'>
							Thank you, {form.fullName}. Your order will be delivered to your
							address.
						</Typography>
						<Button
							component={Link}
							to='/'
							variant='contained'
						>
							Continue shopping
						</Button>
					</CardContent>
				</Card>
			</Container>
		);
	}

	if (cartItems.length === 0) {
		return (
			<Navigate
				to='/cart'
				replace
			/>
		);
	}

	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const handleChange = event => {
		const { name, value } = event.target;
		setForm(currentForm => ({ ...currentForm, [name]: value }));
		setErrors(currentErrors => ({ ...currentErrors, [name]: '' }));
	};

	const handleSubmit = event => {
		event.preventDefault();
		const nextErrors = validateForm(form);
		setErrors(nextErrors);

		if (Object.values(nextErrors).some(Boolean)) {
			return;
		}

		clearCart();
		setSubmitted(true);
	};

	return (
		<Container
			maxWidth='md'
			className='py-8 sm:py-12'
		>
			<Typography
				variant='h4'
				component='h1'
				className='mb-6 font-bold'
			>
				Checkout
			</Typography>
			<Card>
				<CardContent className='p-6 sm:p-8'>
					<Stack
						component='form'
						spacing={3}
						onSubmit={handleSubmit}
						noValidate
					>
						<TextField
							label='Full Name'
							name='fullName'
							value={form.fullName}
							onChange={handleChange}
							error={Boolean(errors.fullName)}
							helperText={errors.fullName}
							required
							fullWidth
						/>
						<TextField
							label='Email Address'
							name='email'
							type='email'
							value={form.email}
							onChange={handleChange}
							error={Boolean(errors.email)}
							helperText={errors.email}
							required
							fullWidth
						/>
						<TextField
							label='Phone Number'
							name='phone'
							value={form.phone}
							onChange={handleChange}
							error={Boolean(errors.phone)}
							helperText={errors.phone || 'Format: +63 9123456789'}
							placeholder='+639123456789'
							inputProps={{ inputMode: 'tel' }}
							required
							fullWidth
						/>
						<TextField
							label='Delivery Address'
							name='deliveryAddress'
							value={form.deliveryAddress}
							onChange={handleChange}
							error={Boolean(errors.deliveryAddress)}
							helperText={errors.deliveryAddress}
							required
							fullWidth
							multiline
							minRows={3}
						/>
						<FormControl error={Boolean(errors.paymentMethod)}>
							<FormLabel>Payment Method</FormLabel>
							<RadioGroup
								name='paymentMethod'
								value={form.paymentMethod}
								onChange={handleChange}
							>
								<FormControlLabel
									value='Cash on Delivery'
									control={<Radio />}
									label={
										<span className='flex items-center gap-2'>
											<PaymentIcon fontSize='small' />
											Cash on Delivery
										</span>
									}
								/>
							</RadioGroup>
						</FormControl>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='center'
						>
							<Typography
								variant='h6'
								className='font-bold'
							>
								Total: ₱{total.toFixed(2)}
							</Typography>
							<LocalShippingIcon color='primary' />
						</Stack>
						<Button
							type='submit'
							variant='contained'
							size='large'
							startIcon={<CheckCircleIcon />}
						>
							Confirm order
						</Button>
					</Stack>
				</CardContent>
			</Card>
		</Container>
	);
}
