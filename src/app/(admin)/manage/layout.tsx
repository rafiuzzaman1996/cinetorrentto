import { AppSidebar } from "@/components/admin/management/app-sidebar"
import ThemeToggle from "@/components/website/shared/ThemeToggle"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function ManageMentLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"> */}
                <header className="sticky top-0 z-50 w-full mb-4 flex justify-between h-12 shrink-0 items-center gap-2 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                    <div className="flex items-center gap-2 px-4">
                        <ThemeToggle />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
