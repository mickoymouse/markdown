import MenuIcon from "@/app/MenuIcon";
import Logo from "@/app/Logo";
import File from "@/app/File";
import Delete from "@/app/Delete";
import Save from "@/app/Save";
import { Data } from "@/db/data";

const Navbar = ({
	setSidebarIsOpen,
	saveMdData,
	mdData,
}: {
	setSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	saveMdData: (id: string) => void;
	mdData: Data | undefined;
}) => {
	return (
		<nav className="bg-cstm-black-800 h-[56px] md:h-[72px] flex items-center justify-between">
			<div className="flex h-full items-center gap-4">
				<button
					className="bg-cstm-black-700 h-full px-4"
					onClick={() => {
						setSidebarIsOpen((prev) => !prev);
					}}
				>
					<MenuIcon />
				</button>
				<div className="hidden md:block">
					<Logo />
				</div>
				<div className="hidden md:block w-[1px] h-[40px] bg-cstm-black-600"></div>
				<File />
				<div>
					<p className="hidden md:block text-body-m font-light text-cstm-black-500">
						Document Name
					</p>
					<h1 className="text-heading-m text-white"> {mdData?.name}</h1>
				</div>
			</div>
			<div className="flex items-center gap-4 mr-4">
				<button>
					<Delete />
				</button>
				<button
					className="flex gap-2 items-center text-white bg-cstm-orange-default p-2 rounded-md hover:bg-cstm-orange-hover"
					onClick={() => {
						saveMdData(mdData?.id!);
					}}
				>
					<Save />
					<span className="hidden md:block">Save Changes</span>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
