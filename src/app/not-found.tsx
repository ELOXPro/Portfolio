import GoBack from '@/components/ui/go-back';

export const metadata = {
  title: "Not Found || Inkingi System",
  description: "Page Not Found in Inkingi System.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function NotFound() {
  return (
    <div className='w-full h-full flex gap-6 items-center justify-center'>
      <div className='border-l border-primary gap-4 flex flex-col p-2'>
      <h1 className='text-primary text-2xl font-extralight'>Page Not Found</h1>
      <GoBack />
      </div>
    </div>
  )
}