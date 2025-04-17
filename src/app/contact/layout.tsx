export const metadata = {
    title: "Contact || Elox",
    description: "Contact Information Of Eloi",
  };
  
  export default async function SkillsLayout({ children }: { children: React.ReactNode }) {
  
    return (
      <main className="w-full flex justify-end items-start">
        {children}
      </main>
    )
  }