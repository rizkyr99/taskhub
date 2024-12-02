import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const WorkspaceSwitcher = () => {
  return (
    <div>
      <div className='flex items-center justify-between mb-2'>
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
    </div>
  );
};

export default WorkspaceSwitcher;
