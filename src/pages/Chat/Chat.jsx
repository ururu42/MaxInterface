import { Sidebar } from '../Sidebar/Sidebar';
import { ChatWindow } from './ChatWindow/ChatWindow';

function buildChatId(phone) {
	let digits = String(phone ?? '').replace(/\D+/g, '');

	if (digits.length === 11 && digits.startsWith('8')) {
		digits = `7${digits.slice(1)}`;
	}
	return digits ? `${digits}@c.us` : null;
}

export const Chat = ({ authData, phone }) => {
	const chatId = buildChatId(phone);

	return (
		<div className="flex w-full h-screen text-white">
			<Sidebar />
			{chatId && (
				<div className="min-w-0 flex-1">
					<ChatWindow authData={authData} chatId={chatId} />
				</div>
			)}
		</div>
	);
};
