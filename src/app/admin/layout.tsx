export const metadata = {
    title: "My Portal || Elox",
    description: "It's Only Me",
  };
  
  export default async function SkillsLayout({ children }: { children: React.ReactNode }) {
  
    return (
      <main className="w-full flex justify-end items-start">
        {children}
      </main>
    )
  }