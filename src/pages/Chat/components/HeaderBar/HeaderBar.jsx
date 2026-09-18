import { Icon } from '@iconify/react';

const actions = [
	{ icon: 'charm:phone', label: 'Позвонить' },
	{ icon: 'ant-design:search-outlined', label: 'Поиск' },
	{ icon: 'bi:three-dots-vertical', label: 'Ещё' },
];

export const HeaderBar = () => {
	return (
		<div className="sticky top-0 z-50 flex justify-center px-4 pt-4">
			<div className="flex w-full max-w-3xl items-center gap-2 rounded-2xl border border-white/5 bg-[#121316] py-2 pl-3 pr-2 shadow-lg">
				<div className="h-10 w-10 shrink-0 rounded-full bg-zinc-500" />
				<div className="min-w-0 flex-1 pl-2">
					<p className="truncate text-sm font-semibold text-white">Марина Арсеньева</p>
					<p className="truncate text-xs text-zinc-500">last seen recently</p>
				</div>
				{actions.map((action) => (
					<button
						key={action.icon}
						type="button"
						aria-label={action.label}
						className="p-2.5 text-zinc-400 transition-colors hover:text-white"
					>
						<Icon icon={action.icon} width={20} height={20} />
					</button>
				))}
			</div>
		</div>
	);
};

