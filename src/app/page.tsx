export const dynamic = "force-dynamic";

export default function Home() {
  const today = new Date();
  const birthDate = new Date(2004, 11, 23);
  const startDate = new Date(2023, 7, 1);

  let age = today.getFullYear() - birthDate.getFullYear();
  const exp = today.getFullYear() - startDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return (
    <div className="flex h-[90%] pr-2 sm:pr-8 items-end justify-end text-xs sm:text-sm font-bold text-primary">
      <h1 className="w-[60%] sm:w-[20%] text-left text-balance">
        At {age} years old, with {exp}+ years of experience, I am  driven by innovation and a passion for new ideas. I embrace
        challenges as opportunities, constantly exploring, building, and
        refining my craft. With a growth-oriented mindset, I push boundaries to
        create impactful solutions. Let’s connect.
      </h1>
    </div>
  );
}
