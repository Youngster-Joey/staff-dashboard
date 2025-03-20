'use client';

import { useEffect, useState } from 'react';
import Profile from './Profile';
import axios, {AxiosResponse} from 'axios';

type Term = {
	year: string;
	semester: string;
};

type Pod = {
	podName: string;
	podCupWinner: boolean;
	term: Term;
};

type Member = {
	name: string;
	role: string;
	website?: string;
	picture1: string;
	picture2: string;
	podHistory: Pod[];
	isEditing?: boolean;
};

const defaultNewMember: Member = {
	name: 'New Team Member',
	role: 'Role Title',
	website: 'https://example.com',
	picture1: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
	picture2: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
	podHistory: [
		{
			podName: 'POD_NAME',
			podCupWinner: false,
			term: { year: '2024', semester: 'Fall' },
		},
	],
	isEditing: true,
};

const About = () => {
	const [data, setData] = useState<string>('initial data');

	const fetchInitial = async () => {
		try {
			const response = await axios.get('http://localhost:5001/about');
			const data = response.data;
			console.log(data);

			// // GET handler
			// export async function GET(request: NextRequest) {
			// 	console.log(request);
			// 	try {
			// 		// Example data - in a real app this might come from a database
			// 		const data = {
			// 			message: 'API is working!',
			// 			timestamp: new Date().toISOString(),
			// 		};

			// 		// Return successful response with the data
			// 		return NextResponse.json(data, { status: 200 });
			// 	} catch (error) {
			// 		// Handle any errors
			// 		console.error('GET request failed:', error);
			// 		return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
			// 	}
			// }

			setData(data[0].first_name || 'No message received');
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchInitial();
	}, []);

	const initialMembers: Member[] = [
		{
			name: data,
			role: 'Backend Engineer',
			website: 'https://www.johndoe.com',
			picture1: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			picture2: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			podHistory: [
				{
					podName: 'STAFF_DASHBOARD',
					podCupWinner: true,
					term: { year: '2023', semester: 'Fall' },
				},
				{
					podName: 'SUGGESTED_CLASSES',
					podCupWinner: false,
					term: { year: '2024', semester: 'Spring' },
				},
				{
					podName: 'SUGGESTED_CLASSES',
					podCupWinner: false,
					term: { year: '2024', semester: 'Spring' },
				},
			],
		},
		{
			name: 'Jane Doe',
			role: 'Frontend Engineer',
			picture1: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			picture2: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			podHistory: [
				{
					podName: 'STAFF_DASHBOARD',
					podCupWinner: false,
					term: { year: '2023', semester: 'Fall' },
				},
				{
					podName: 'SUGGESTED_CLASSES',
					podCupWinner: true,
					term: { year: '2024', semester: 'Spring' },
				},
			],
		},
		{
			name: 'Jane Doe',
			role: 'Frontend Engineer',
			picture1: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			picture2: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			podHistory: [
				{
					podName: 'STAFF_DASHBOARD',
					podCupWinner: false,
					term: { year: '2023', semester: 'Fall' },
				},
				{
					podName: 'SUGGESTED_CLASSES',
					podCupWinner: true,
					term: { year: '2024', semester: 'Spring' },
				},
			],
		},
		{
			name: 'Jane Doe',
			role: 'Frontend Engineer',
			picture1: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			picture2: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			podHistory: [
				{
					podName: 'STAFF_DASHBOARD',
					podCupWinner: false,
					term: { year: '2023', semester: 'Fall' },
				},
				{
					podName: 'SUGGESTED_CLASSES',
					podCupWinner: true,
					term: { year: '2024', semester: 'Spring' },
				},
			],
		},
	];

	const [members, setMembers] = useState<Member[]>(initialMembers);

	const addNewMember = () => {
		// Create a new member with unique random images
		const newMember = {
			...defaultNewMember,
			picture1: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
			picture2: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + 1}/200/200`,
		};

		// Add to the beginning of the array
		setMembers([newMember, ...members]);
	};

	const updateMember = (index: number, updatedMember: Member) => {
		const newMembers = [...members];
		newMembers[index] = updatedMember;
		setMembers(newMembers);
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-screen-2xl mx-auto'>
				<div className='text-center mb-10'>
					<h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
						Our Team
					</h1>
					<p className='mt-5 max-w-xl mx-auto text-xl text-gray-500'>
						Meet the talented individuals behind our success
					</p>

					<button
						onClick={addNewMember}
						className='mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 mr-2'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 4v16m8-8H4'
							/>
						</svg>
						{/* Add New Team Member */}
						{data}
					</button>
				</div>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{members.map((member, index) => (
						<Profile
							key={`${member.name}-${index}`}
							member={member}
							onUpdate={(updatedMember) => updateMember(index, updatedMember)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default About;
