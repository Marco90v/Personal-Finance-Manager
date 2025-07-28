import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import Sidebard from "@/components/common/Sidebar"

export default function LayoutSidebard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebard />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}