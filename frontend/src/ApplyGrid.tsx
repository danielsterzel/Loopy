export function ApplyGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen">
      

      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between">
        <div className="absolute top-0 right-[10%] bg-neutral-400/20 h-full w-px "/>
        <div className="absolute top-0 left-[10%] bg-neutral-400/20 h-full w-px"/>
        {/* <div className="absolute top-0 left-1/2 bg-neutral-400 h-full w-px"/> */}
      </div>

      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}