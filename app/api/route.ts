import { NextRequest, NextResponse } from 'next/server';
import axios, {AxiosResponse} from 'axios';

// GET handler
export async function GET(request: NextRequest) {
	console.log(request);
	try {
		// Example data - in a real app this might come from a database
		const data = {
			message: 'API is working!',
			timestamp: new Date().toISOString(),
		};

		// Return successful response with the data
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		// Handle any errors
		console.error('GET request failed:', error);
		return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
	}
}

async function getData() {
	const response = await axios.get('http://localhost:5001/about');
	console.log(response.data);

	return response.data;
}

// post
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		console.log('Received data:', body);

		// Here you would typically handle the data (e.g., save it to a database)

		// Return a success response
		return NextResponse.json(
			{ message: 'Data received successfully', data: body },
			{ status: 201 }
		);
	} catch (error) {
		console.error('POST request failed:', error);
		return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
	}
}

// delete
export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		console.log('Delete request received for ID:', body.id);

		// Here you would typically handle the deletion (e.g., remove from a database)

		// Return a success response
		return NextResponse.json(
			{ message: `Data with ID ${body.id} deleted successfully` },
			{ status: 200 }
		);
	} catch (error) {
		console.error('DELETE request failed:', error);
		return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
	}
}
