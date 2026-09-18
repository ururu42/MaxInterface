import { useState } from 'react';
import { Chat } from './pages/Chat/Chat';
import { Auth } from './pages/Auth/Auth';
import { NumberPhonePage } from './pages/NumberPhonePage/NumberPhonePage';

function App() {
	const [credentials, setCredentials] = useState(null);
	const [phone, setPhone] = useState(null);

	return (
		<div className="bg-gray-800 w-full min-h-screen">
			{phone ? (
				<Chat />
			) : credentials ? (
				<NumberPhonePage onSuccess={setPhone} />
			) : (
				<Auth onSuccess={setCredentials} />
			)}
		</div>
	);
}

export default App;
