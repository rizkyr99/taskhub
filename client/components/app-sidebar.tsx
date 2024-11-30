import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import Link from 'next/link';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center justify-between my-2'>
          <span className='font-semibold text-neutral-500 uppercase text-xs'>
            Workspaces
          </span>
          <button className='bg-neutral-500 rounded-full p-0.5 hover:bg-neutral-700 transition'>
            <Plus className='size-4 text-white' />
          </button>
        </div>
        <Select defaultValue='0'>
          <SelectTrigger className='bg-neutral-200 h-12 pl-1 rounded-lg font-semibold'>
            <div className='flex items-center bg-neutral-200 text-sm rounded-lg space-x-2'>
              <SelectValue placeholder='Select Workspace' />
            </div>
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3].map((item, index) => (
              <SelectItem key={index} value={index.toString()}>
                <div className='flex items-center gap-x-2'>
                  <div className='rounded-lg size-10 bg-blue-500 text-white font-semibold flex items-center justify-center'>
                    R
                  </div>
                  Workspace {item}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/'>
                  <span className='text-sm'>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/'>
                  <span className='text-sm'>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
