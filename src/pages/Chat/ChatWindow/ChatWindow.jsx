import { useState, useEffect, useRef } from 'react';
import { Header, Form } from '../../../components';

export const ChatWindow = ({ authData, chatId }) => {
	const { instance, token } = authData ?? {};
	const [messages, setMessages] = useState([]);
	const bottomRef = useRef(null);

	const apiBaseUrl = `https://${instance?.substring(0, 4)}.api.green-api.com/waInstance${instance}`;
	const cleanChatId = String(chatId).replace(/\D/g, '');

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSendMessage = async (text) => {
		if (!instance || !token) return;

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

						if (body?.typeWebhook === 'incomingMessageReceived') {
							if (
								cleanChatId ===
								String(body?.senderData?.senderPhoneNumber)
							) {
								const incomingText =
									body.Message ||
									body.message?.text ||
									body.messageData?.textMessage ||
									body.messageData?.textMessageData?.textMessage ||
									body.messageData?.extendedTextMessageData
										?.textMessage ||
									body.messageData?.extendedTextMessageData?.text;

								if (incomingText) {
									setMessages((prev) => [
										...prev,
										{ direction: 'in', text: incomingText },
									]);
								}
							}
						}

						await fetch(
							`${apiBaseUrl}/deleteNotification/${token}/${receiptId}`,
							{ method: 'DELETE' },
						).catch(() => null);
					} else {
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
	}, [instance, token, apiBaseUrl, chatId, cleanChatId]);

	return (
		<div className="flex h-screen w-full flex-col bg-gray-900 text-white">
			<Header chatId={chatId} />

			<div className="relative flex-1 overflow-y-auto bg-black p-6">
				<div
					className="absolute inset-0 pointer-events-none opacity-40 bg-repeat"
					style={{
						backgroundImage: `url('/img/structure.png')`,
						backgroundSize: '400px',
					}}
				></div>

				<div className="relative z-10 max-w-4xl mx-auto w-full space-y-3">
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`flex w-full ${msg.direction === 'out' ? 'justify-end' : 'justify-start'}`}
						>
							<div
								className={`max-w-[75%] rounded-xl px-4 py-2 text-sm ${
									msg.direction === 'out'
										? 'bg-pink-700'
										: 'bg-violet-800'
								}`}
							>
								<p className="break-words">{msg.text}</p>
							</div>
						</div>
					))}

					<div ref={bottomRef} />
				</div>
			</div>
			<Form onSendMessage={handleSendMessage} />
		</div>
	);
};
