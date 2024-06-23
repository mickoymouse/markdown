import { cn } from "@/lib/utils";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
	return (
		<aside
			className={cn(
				"w-[250px] fixed top-0 left-0 h-full transition-transform duration-300",
				{
					"translate-x-[-100%]": !isOpen,
					"translate-x-0 ": isOpen,
				}
			)}
		>
			Sidebar
		</aside>
	);
};

export default Sidebar;
