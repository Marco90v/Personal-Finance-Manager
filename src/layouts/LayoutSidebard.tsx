import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import Sidebard from "@/components/common/Sidebar"
import { Suspense } from "react"
import LoadingSpinner from "@/components/common/LoadingSpinner"

export default function LayoutSidebard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebard />
      <main className="w-full">
        <SidebarTrigger />
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </main>
    </SidebarProvider>
  )
}