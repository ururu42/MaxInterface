import { Sidebar } from '../Sidebar/Sidebar';
import { Contacts } from '../Contacts/Contacts';
import { HeaderBar } from './components/HeaderBar/HeaderBar';
import { BottomBar } from './components/BottomBar/BottomBar';

export const Chat = () => {
	return (
		<div className="flex w-full h-screen text-white">
			<Sidebar />
			{/* <Contacts /> */}
			<div className="flex-1 overflow-y-auto">
				<HeaderBar />
			</div>
			<BottomBar />
		</div>
	);
};
