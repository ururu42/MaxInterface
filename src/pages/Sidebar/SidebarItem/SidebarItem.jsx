import { Icon } from '@iconify/react';
export const SidebarItem = ({ icon, label, badge, badgeClass, active, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className={`flex w-full flex-col items-center gap-1.5 py-2.5 transition-colors ${
			active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
		}`}
	>
		<span className="relative">
			<Icon icon={icon} width={24} height={24} />
			{badge !== undefined && (
				<span
					className={`absolute -right-2.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none ${badgeClass}`}
				>
					{badge}
				</span>
			)}
		</span>
		<span className="text-[11px] leading-none">{label}</span>
	</button>
);
