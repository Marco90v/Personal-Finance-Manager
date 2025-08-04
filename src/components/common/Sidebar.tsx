import { ArrowRightLeft, BanknoteArrowDown, BanknoteArrowUp, Home, Settings, Wallet } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Add Income",
    url: "/dashboard/income",
    icon: BanknoteArrowUp,
  },
  {
    title: "Add Expenses",
    url: "/dashboard/expenses",
    icon: BanknoteArrowDown,
  },
  {
    title: "Accounts / Funds",
    url: "/dashboard/accounts",
    icon: Wallet,
  },
  {
    title: "Transaction History",
    url: "/dashboard/transactions",
    icon: ArrowRightLeft,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

const Sidebard = () => {
  return (
    <Sidebar collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>FinanTrack</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="peer-data-[active=true]/menu-button:opacity-100" asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
export default Sidebard