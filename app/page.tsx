import About from '@/components/About';
import axios from 'axios';

export default function Home() {
	axios
		.get('http://localhost:5001/about')
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.error('There was an error!', error);
		});

	return (
		<div>
			<h1>Home Page</h1>
			<About />
		</div>
	);
}
