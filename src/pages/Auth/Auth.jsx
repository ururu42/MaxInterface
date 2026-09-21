import { useState } from 'react';
import { Icon } from '@iconify/react';

export const Auth = ({ onSuccess }) => {
	const [instance, setInstance] = useState('');
	const [token, setToken] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!instance.trim() || !token.trim()) return;

		setError('');
		setLoading(true);

		const cleanInstance = instance.trim();
		const cleanToken = token.trim();

		try {
			const apiHost = 'https://api.green-api.com';
			const url = `${apiHost}/waInstance${cleanInstance}/getStateInstance/${cleanToken}`;

			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				onSuccess?.({ instance: cleanInstance, token: cleanToken });
			} else {
				setError('Неверный Instance или token. Проверьте данные.');
			}
		} catch (err) {
			setError('Ошибка сети или CORS. Проверьте консоль браузера.');
			console.error('Детали ошибки:', err);
		} finally {
			setLoading(false);
		}
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
							icon="boxicons:lock-alt"
							width={24}
							height={24}
							className="text-blue-500"
						/>
					</span>
					<h1 className="text-lg font-semibold">Вход в приложение</h1>
					<p className="text-center text-sm text-zinc-500">
						Введите Instance и token для подключения
					</p>
				</div>

				<label className="flex flex-col gap-1.5">
					<span className="text-sm text-zinc-400">Введите ваш Instance</span>
					<input
						type="text"
						value={instance}
						onChange={(e) => setInstance(e.target.value)}
						required
						autoComplete="off"
						disabled={loading}
						placeholder="my-instance"
						className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-blue-500/60 focus:bg-white/10 disabled:opacity-50"
					/>
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="text-sm text-zinc-400">Введите ваш token</span>
					<input
						type="password"
						value={token}
						onChange={(e) => setToken(e.target.value)}
						required
						autoComplete="off"
						disabled={loading}
						placeholder="••••••••••••••••"
						className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-blue-500/60 focus:bg-white/10 disabled:opacity-50"
					/>
				</label>

				{error && (
					<p className="text-center text-xs font-medium text-red-400">
						{error}
					</p>
				)}

				<button
					type="submit"
					disabled={loading}
					className="mt-1 flex items-center justify-center rounded-lg bg-blue-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-500/40 disabled:cursor-not-allowed"
				>
					{loading ? 'Проверка...' : 'Продолжить'}
				</button>
			</form>
		</div>
	);
};
