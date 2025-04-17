export const metadata = {
    title: "Credits || Elox",
    description: "Credits Goes To",
  };
  
  export default async function SkillsLayout({ children }: { children: React.ReactNode }) {
  
    return (
      <main className="w-full h-full flex justify-end items-start">
        {children}
      </main>
    )
  }