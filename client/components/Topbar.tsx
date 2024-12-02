'use client';

import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut, Menu, Settings, User } from 'lucide-react';
import { Button } from './ui/button';
import useSidebarStore from '@/store/sidebarStore';

const Topbar = () => {
  const { openSidebar } = useSidebarStore();

  return (
    <nav className='h-20 w-full flex items-start justify-between p-4'>
      <div className='flex items-center gap-x-4'>
        <Button
          variant='ghost'
          className='lg:hidden hover:bg-neutral-100'
          onClick={openSidebar}>
          <Menu />
        </Button>
        <div>
          <h1 className='font-bold text-lg'>Dashboard</h1>
          <p className='text-xs text-neutral-500'>
            View all of your tasks here
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='p-1 hover:bg-neutral-100 rounded-lg transition'>
            <div className='size-8 bg-neutral-200 rounded-lg flex items-center justify-center text-sm text-neutral-500 font-semibold select-none'>
              A
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel asChild>
            <div className='flex items-center gap-x-2'>
              <div className='size-8 bg-neutral-200 rounded-lg flex items-center justify-center text-sm text-neutral-500 font-semibold select-none'>
                A
              </div>
              <div>
                <p className='text-sm'>Rizky Ramadhan</p>
                <p className='text-xs font-normal text-neutral-500'>
                  ramarizdev@gmail.com
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Topbar;
