export const Header = ({ chatId }) => {
	return (
		<header className="flex h-16 items-center gap-4 bg-[#121316] px-6 border-b border-white/5">
			<div className="max-w-4xl mx-auto w-full">
				<h2 className="text-sm font-semibold">Чат с пользователем</h2>
				<p className="text-xs text-zinc-500">{chatId.replace('@c.us', '')}</p>
			</div>
		</header>
	);
};
