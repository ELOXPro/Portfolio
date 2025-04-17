export const metadata = {
  title: "Loading || Elox",
  description: "Loading Eloi's Portfolio.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-light text-primary tracking-widest">
        Loading
      </h1>
    </div>
  );
}
