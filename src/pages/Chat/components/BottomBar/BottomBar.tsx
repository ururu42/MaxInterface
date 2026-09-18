import { Icon } from '@iconify/react';

export const BottomBar = () => {
	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
			<div className="pointer-events-auto flex w-full max-w-3xl items-center gap-2 rounded-2xl border border-white/5 bg-[#121316] py-2 pl-3 pr-2 shadow-lg">
				<button
					type="button"
					aria-label="Прикрепить файл"
					className="p-2.5 text-zinc-400 transition-colors hover:text-white"
				>
					<Icon icon="f7:paperclip" width={22} height={22} />
				</button>
				<input
					type="text"
					placeholder="Message"
					className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
				/>
				<button
					type="button"
					aria-label="Эмодзи"
					className="p-2.5 text-zinc-400 transition-colors hover:text-white"
				>
					<Icon icon="ant-design:smile-outlined" width={22} height={22} />
				</button>
				<button
					type="button"
					aria-label="Голосовое сообщение"
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white transition-colors hover:bg-violet-400"
				>
					<Icon icon="akar-icons:microphone" width={20} height={20} />
				</button>
			</div>
		</div>
	);
};
