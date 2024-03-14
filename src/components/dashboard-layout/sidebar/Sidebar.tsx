
import { COLORS } from "@/constants/color.constants";
import { GanttChartSquare } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { MENU } from "./menu.data";
import { MenuItem } from "./MenuItem";

export function Sidebar() {
    return <aside className="border-r border-r-border h-full bg-sidebar flex flex-col justify-between">
        <div>
            <Link href="/" className="flex items-center gap-2.5 p-layout border-b border-b-border">
                <GanttChartSquare color={COLORS.primary} size={38}/>
                <span className="text-2xl font-bold relative">
                    Planner
                </span>
            </Link>
            <div className="p-3 relative">
                <LogoutButton />
                {MENU.map(item => <MenuItem key={item.link} item={item} />)}
            </div>
        </div>
        <footer className="text-xs opacity-40 font-normal text-center p-layout">
                2024 &copy With love from <a href="https://github.com/Vierin" target="_blank" rel="noreferrer" className="hover:text-primary text-brand-300 transition-colors">Ivan Vierin</a>
            <br/> All rights reserved.
        </footer>
    </aside>
}