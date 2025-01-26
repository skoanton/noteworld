import Header from "@/components/Header"
import { Outlet } from "react-router"

type DashboardLayoutProps = {}

export default function DashboardLayout({ }: DashboardLayoutProps) {
    return (
        <main className="flex flex-col h-screen">
            <Header />
            <Outlet />
        </main>
    )
}