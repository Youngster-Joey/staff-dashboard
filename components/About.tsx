import Profile from './Profile';

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
};

const About = () => {
	const members: Member[] = [
		{
			name: 'John Doe',
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

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-screen-2xl mx-auto'>
				<div className='text-center mb-16'>
					<h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
						Our Team
					</h1>
					<p className='mt-5 max-w-xl mx-auto text-xl text-gray-500'>
						Meet the talented individuals behind our success
					</p>
				</div>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{members.map((member) => (
						<Profile key={member.name} member={member} />
					))}
				</div>
			</div>
		</div>
	);
};

export default About;
