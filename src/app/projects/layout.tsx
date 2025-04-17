export const metadata = {
    title: "Projects || Elox",
    description: "Projects Developed By Eloi Iradukunda",
  };
  
  export default async function SkillsLayout({ children }: { children: React.ReactNode }) {
  
    return (
      <main className="w-full flex justify-end items-start">
        {children}
      </main>
    )
  }