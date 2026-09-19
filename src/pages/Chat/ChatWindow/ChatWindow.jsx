import { useState, useEffect, useRef } from 'react';

export const ChatWindow = ({ authData, chatId, onBack }) => {
	const { instance, token } = authData ?? {};
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const bottomRef = useRef(null);

	const apiBaseUrl = `https://${instance?.substring(0, 4)}.api.green-api.com/waInstance${instance}`;

	// Автоматическая прокрутка вниз
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// 1. ОТПРАВКА СООБЩЕНИЯ (POST)
	const handleSend = async (e) => {
		e.preventDefault();
		if (!inputValue.trim() || !instance || !token) return;

		const text = inputValue.trim();
		setInputValue('');

		// Сразу добавляем своё сообщение на экран
		setMessages((prev) => [...prev, { direction: 'out', text }]);

		try {
			const res = await fetch(`${apiBaseUrl}/sendMessage/${token}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chatId: chatId,
					message: text,
				}),
			});
			if (!res.ok) {
				const errJson = await res.json().catch(() => null);
				console.error('Ошибка отправки:', res.status, errJson);
			}
		} catch (error) {
			console.error('Ошибка отправки:', error);
		}
	};

	// 2. МАКСИМАЛЬНО ПРОСТОЙ ЦИКЛ ПОЛУЧЕНИЯ СООБЩЕНИЙ
	useEffect(() => {
		if (!instance || !token) return undefined;

		let isAlive = true;

		const startLoop = async () => {
			while (isAlive) {
				try {
					const res = await fetch(
						`${apiBaseUrl}/receiveNotification/${token}?receiveTimeout=20`,
					);
					if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

					const data = await res.json().catch(() => null);

					if (data && data.receiptId) {
						const receiptId = data.receiptId;
						const body = data.body;

						// Самая примитивная проверка: это входящее сообщение?
						if (body?.typeWebhook === 'incomingMessageReceived') {
							// Вытаскиваем текст из любого возможного места, где он может быть
							const incomingText =
								body.message?.text ||
								body.messageData?.textMessageData?.textMessage ||
								body.messageData?.extendedTextMessageData?.text;

							// Если какой-то текст нашелся — просто выводим его на экран!
							if (incomingText) {
								setMessages((prev) => [
									...prev,
									{ direction: 'in', text: incomingText },
								]);
							}
						}

						// Сразу же удаляем уведомление с сервера, чтобы очередь не забивалась
						await fetch(
							`${apiBaseUrl}/deleteNotification/${token}/${receiptId}`,
							{ method: 'DELETE' },
						).catch(() => null);
					} else {
						// Если очередь пуста, ждем 1 секунду перед следующим запросом
						await new Promise((resolve) => setTimeout(resolve, 1000));
					}
				} catch (error) {
					console.error('Ошибка в цикле получения:', error);
					await new Promise((resolve) => setTimeout(resolve, 4000));
				}
			}
		};

		startLoop();

		return () => {
			isAlive = false;
		};
	}, [instance, token, apiBaseUrl]); // Убрали chatId из зависимостей, чтобы цикл не перезапускался

	return (
		<div className="flex h-screen w-full flex-col bg-gray-900 text-white">
			{/* Шапка чата */}
			<header className="flex h-16 items-center gap-4 bg-[#121316] px-6 border-b border-white/5">
				<div>
					<h2 className="text-sm font-semibold">Чат с пользователем</h2>
					<p className="text-xs text-zinc-500">{chatId.replace('@c.us', '')}</p>
				</div>
			</header>

			{/* Лента сообщений */}
			<div className="flex-1 overflow-y-auto bg-[#0b0c0e] p-6 space-y-3">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`flex w-full ${msg.direction === 'out' ? 'justify-end' : 'justify-start'}`}
					>
						<div
							className={`max-w-[75%] rounded-xl px-4 py-2 text-sm ${
								msg.direction === 'out' ? 'bg-blue-500' : 'bg-[#1c1d22]'
							}`}
						>
							<p className="break-words">{msg.text}</p>
						</div>
					</div>
				))}
				<div ref={bottomRef} />
			</div>

			{/* Форма ввода */}
			<form
				onSubmit={handleSend}
				className="flex gap-2 bg-[#121316] p-4 border-t border-white/5"
			>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Написать сообщение…"
					className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
				/>
				<button
					type="submit"
					disabled={!inputValue.trim()}
					className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold hover:bg-blue-600 disabled:opacity-40"
				>
					Отправить
				</button>
			</form>
		</div>
	);
};
