import AppSidebar from '@/components/AppSidebar';
import Topbar from '@/components/Topbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar />
      <main className='lg:pl-64'>
        <Topbar />
        {children}
      </main>
    </>
  );
};

export default MainLayout;
