import { Sidebar } from '../Sidebar/Sidebar';
import { ChatWindow } from './ChatWindow/ChatWindow';

/**
 * GREEN-API идентификатор чата собеседника:
 * из номера телефона (любого формата, например «+7 900 000-00-00»
 * или «8 900 000-00-00») оставляем только цифры, при необходимости
 * приводим к международному формату (ведущий 8 → 7) и добавляем
 * суффикс «@c.us», например «79000000000@c.us».
 */
function buildChatId(phone) {
	let digits = String(phone ?? '').replace(/\D+/g, '');
	// Внутренний российский формат: 11 цифр, начинающихся с 8
	// (8 9xx xxx-xx-xx) → международный: 7 9xx xxx xx xx
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
