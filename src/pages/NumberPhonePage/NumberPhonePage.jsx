import { useState } from 'react';
import { Icon } from '@iconify/react';

export const NumberPhonePage = ({ onSuccess }) => {
	const [phone, setPhone] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const cleanPhone = phone.trim();
		if (!cleanPhone) return;
		onSuccess?.({ phone: cleanPhone });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-800 p-4 text-white">
			<form
				onSubmit={handleSubmit}
				className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-white/5 bg-[#121316] p-8 shadow-2xl"
			>
				<div className="flex flex-col items-center gap-3">
					<span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/5">
						<Icon
							icon="boxicons:phone-call"
							width={24}
							height={24}
							className="text-blue-500"
						/>
					</span>
					<h1 className="text-lg font-semibold">Вход в приложение</h1>
					<p className="text-center text-sm text-zinc-500">
						Почти готово! Введите номер получателя, чтобы начать общение
					</p>
				</div>

				<label className="flex flex-col gap-1.5">
					<span className="text-sm text-zinc-400">
						Введите номер телефона получателя
					</span>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						autoComplete="off"
						placeholder="+7 900 000-00-00"
						className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-blue-500/60 focus:bg-white/10"
					/>
				</label>

				<button
					type="submit"
					className="mt-1 flex items-center justify-center rounded-lg bg-blue-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-700"
				>
					Начать общение
				</button>
			</form>
		</div>
	);
};
