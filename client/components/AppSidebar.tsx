'use client';

import { Home, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import WorkspaceSwitcher from './WorkspaceSwitcher';
import useSidebarStore from '@/store/sidebarStore';

const Sidebar = () => {
  const { isMobileOpen, closeSidebar } = useSidebarStore();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const SidebarContent = () => (
    <div className='flex h-full flex-col gap-4'>
      <WorkspaceSwitcher />
      <nav className='py-2' aria-label='Main navigation'>
        {/* <h2 className='mb-2 px-4 text-lg font-semibold'>Navigation</h2> */}
        <div className='space-y-1'>
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant='ghost'
              className='w-full justify-start gap-2 hover:bg-neutral-200 transition'
              aria-label={item.label}>
              <item.icon className='h-4 w-4' aria-hidden='true' />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
        <div className='flex grow flex-col gap-y-2 overflow-y-auto bg-neutral-100 px-6 pb-4'>
          <div className='flex h-16 shrink-0 items-center'>
            <span className='text-xl font-semibold'>Logo</span>
          </div>
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={closeSidebar}>
        <SheetContent side='left' className='w-64 p-4'>
          <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
          <div className='flex h-16 shrink-0 items-center px-6'>
            <span className='text-xl font-semibold'>Logo</span>
          </div>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
