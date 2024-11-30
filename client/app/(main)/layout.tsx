import { AppSidebar } from '@/components/app-sidebar';
import Topbar from '@/components/topbar';
import { SidebarProvider } from '@/components/ui/sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Topbar />
        <main>{children}</main>
      </SidebarProvider>
    </>
  );
};

export default MainLayout;
