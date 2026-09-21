import { useState } from 'react';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { Icon } from '@iconify/react';

const navItems = [
	{
		id: 'all',
		label: 'All',
		icon: 'boxicons:message-bubble-dots-filled',
		badge: 3,
		badgeClass: 'bg-blue-500 text-white',
	},
	{
		id: 'new',
		label: 'New',
		icon: 'at-icons:folder-open',
		badge: 4,
		badgeClass: 'bg-zinc-500 text-zinc-900',
	},
	{ id: 'channels', label: 'Channels', icon: 'at-icons:folder', separatorAfter: true },
	{ id: 'contacts', label: 'Contacts', icon: 'fluent-mdl2:connect-contacts' },
	{ id: 'calls', label: 'Calls', icon: 'famicons:call' },
];

const bottomItems = [
	{ id: 'settings', label: 'Settings', icon: 'boxicons:message-bubble-dots-filled' },
];

export const Sidebar = () => {
	const [activeId, setActiveId] = useState('all');

	return (
		<aside className="flex h-full w-28 shrink-0 flex-col items-center border-r border-white/5 bg-[#121316] py-4">
			<nav className="flex w-full flex-col">
				{navItems.map((item) => (
					<div key={item.id}>
						<SidebarItem
							{...item}
							active={activeId === item.id}
							onClick={() => setActiveId(item.id)}
						/>
						{item.separatorAfter && (
							<div className="mx-5 my-3 h-px bg-white/10" />
						)}
					</div>
				))}
			</nav>
			<div className="flex-1" />
			{bottomItems.map((item) => (
				<SidebarItem
					key={item.id}
					{...item}
					active={activeId === item.id}
					onClick={() => setActiveId(item.id)}
				/>
			))}
		</aside>
	);
};
