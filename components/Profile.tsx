'use client';

import { useState, useEffect } from 'react';

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

interface ProfileProps {
	member: Member;
	onUpdate: (updatedMember: Member) => void;
}

const Profile: React.FC<ProfileProps> = ({ member, onUpdate }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(!!member.isEditing);

	const [memberData, setMemberData] = useState<Member>(member);
	const [jsonData, setJsonData] = useState<string>(JSON.stringify(member, null, 2));

	// Update editing state when the member prop changes
	useEffect(() => {
		setIsEditing(!!member.isEditing);
	}, [member.isEditing]);

	const handleSave = () => {
		try {
			const updatedData = JSON.parse(jsonData);
			// Update local state
			setMemberData(updatedData);
			// Notify parent component
			onUpdate({
				...updatedData,
				isEditing: false,
			});
			setIsEditing(false);
		} catch (error) {
			console.log(error);
			alert('Invalid JSON. Please check your input.');
		}
	};

	const handleCancel = () => {
		// Reset to original data
		setJsonData(JSON.stringify(memberData, null, 2));
		setIsEditing(false);
		onUpdate({
			...memberData,
			isEditing: false,
		});
	};

	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 h-full'>
			<div className='text-center pt-6 px-6 relative'>
				<button
					onClick={() => {
						if (isEditing) {
							// If already editing, clicking again should reset
							setJsonData(JSON.stringify(memberData, null, 2));
						}
						setIsEditing(!isEditing);
						if (!isEditing) {
							onUpdate({
								...memberData,
								isEditing: true,
							});
						}
					}}
					className='absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900'
					title={isEditing ? 'Cancel' : 'Edit'}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d={
								isEditing
									? 'M6 18L18 6M6 6l12 12' // X icon when editing
									: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' // Edit icon when not editing
							}
						/>
					</svg>
				</button>
				<h2 className='text-2xl font-bold text-gray-900 truncate'>
					{isEditing ? 'Edit Profile' : memberData.name}
				</h2>
			</div>

			{isEditing ? (
				<div className='p-4'>
					<textarea
						className='w-full h-80 font-mono text-sm p-2 border border-gray-300 rounded-md'
						value={jsonData}
						onChange={(e) => setJsonData(e.target.value)}
					/>
					<div className='mt-4 flex justify-between'>
						<button
							onClick={handleCancel}
							className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
						>
							Save Changes
						</button>
					</div>
				</div>
			) : (
				<>
					{/* Image container with hover effect */}
					<div
						className='relative w-full h-60 mt-4 overflow-hidden'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<img
							src={isHovered ? memberData.picture2 : memberData.picture1}
							alt={`${memberData.name} - ${isHovered ? 'Secondary' : 'Primary'}`}
							className='w-full h-full object-cover transition-opacity duration-300'
						/>
					</div>

					<div className='p-4'>
						<div className='flex justify-center'>
							<div className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800'>
								{memberData.role}
							</div>
						</div>

						{memberData.website && (
							<div className='mt-4 flex justify-center'>
								<a
									href={memberData.website}
									target='_blank'
									rel='noopener noreferrer'
									className='text-indigo-600 hover:text-indigo-500 flex items-center'
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
											d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
										/>
									</svg>
									Portfolio
								</a>
							</div>
						)}

						<div className='mt-6'>
							<h3 className='text-lg font-medium text-gray-900 text-center'>Pod History</h3>
							<div className='mt-2 flex flex-col gap-2'>
								{memberData.podHistory.map((pod, idx) => (
									<span
										key={`${pod.podName}-${pod.term.year}-${pod.term.semester}-${idx}`}
										className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
											pod.podCupWinner ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
										}`}
									>
										<div className='flex flex-col flex-grow'>
											<span className='truncate'>{pod.podName.replace(/_/g, ' ')}</span>
											<span className='text-xs'>
												{pod.term.semester} {pod.term.year}
											</span>
										</div>
										{pod.podCupWinner && (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4 ml-1 text-amber-600'
												viewBox='0 0 20 20'
												fill='currentColor'
											>
												<path
													fillRule='evenodd'
													d='M10 1l2.928 6.377 6.541.95-4.786 4.635 1.13 6.529L10 16.438l-5.813 3.053 1.13-6.529L.53 8.328l6.541-.95L10 1z'
													clipRule='evenodd'
												/>
											</svg>
										)}
									</span>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;
