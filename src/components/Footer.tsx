export const dynamic = "force-dynamic";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <div className="absolute bottom-8 w-[30%] text-center text-xs font-bold tracking-tighter text-primary">
      &copy; {date} Eloi Iradukunda, All Rights Reserved
    </div>
  );
}
