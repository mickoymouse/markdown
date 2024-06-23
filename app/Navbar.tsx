import MenuIcon from "@/app/MenuIcon";
import Logo from "@/app/Logo";
import File from "@/app/File";
import Delete from "@/app/Delete";
import Save from "@/app/Save";

const Navbar = ({
	setSidebarIsOpen,
}: {
	setSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<nav className="bg-cstm-black-800 h-[72px] flex items-center justify-between">
			<div className="flex h-full items-center gap-4">
				<button
					className="bg-cstm-black-700 h-full p-6"
					onClick={() => {
						setSidebarIsOpen((prev) => !prev);
					}}
				>
					<MenuIcon />
				</button>
				<Logo />
				<div className="w-[1px] h-[40px] bg-cstm-black-600"></div>
				<File />
				<div>
					<p className="text-body-m font-light text-cstm-black-500">
						Document Name
					</p>
					<h1 className="text-heading-m text-white">welcome.md</h1>
				</div>
			</div>
			<div className="flex items-center gap-4 mr-4">
				<button>
					<Delete />
				</button>
				<button className="flex gap-2 items-center text-white bg-cstm-orange-default p-2 rounded-md hover:bg-cstm-orange-hover">
					<Save />
					<span>Save Changes</span>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
