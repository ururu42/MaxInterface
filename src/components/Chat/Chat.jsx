import { Sidebar } from './Sidebar/Sidebar';
import { Contacts } from './Contacts/Contacts';

export const Chat = () => {
	return (
		<div className="flex w-full h-screen text-white">
			<Sidebar />
			<Contacts />
			<div className="flex-1 p-4">Это окно чата (основная зона)</div>
		</div>
	);
};
