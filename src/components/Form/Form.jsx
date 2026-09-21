import { useState } from 'react';

export const Form = ({ onSendMessage }) => {
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!text.trim()) return;

		onSendMessage(text.trim());

		setText('');
	};

	return (
		<div className="bg-[#121316] p-4 border-t border-white/5">
			<form onSubmit={handleSubmit} className="max-w-4xl mx-auto w-full flex gap-2">
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Написать сообщение…"
					className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
				/>
				<button
					type="submit"
					disabled={!text.trim()}
					className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold hover:bg-blue-600 disabled:opacity-40"
				>
					Отправить
				</button>
			</form>
		</div>
	);
};
