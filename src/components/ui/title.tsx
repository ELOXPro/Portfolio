type RoleTitleProps = {
  title: string;
};

export default function RoleTitle({ title }: RoleTitleProps) {
  return (
    <div
      className="flex h-auto w-auto items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary to-60%
    p-1 text-[0.5rem] font-extrabold capitalize text-background duration-300"
    >
      <div className="w-full rounded-full px-1 text-center">{title}</div>
    </div>
  );
}
