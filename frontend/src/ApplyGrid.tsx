

export function ApplyGrid({children} : {children : React.ReactNode})
{
    return (<div className="pointer-events-none
    absolute inset-0 bg-[url('/grid.svg')] opacity-35">
        <div className="relative z-10">
            {children}
        </div>
    </div>);
    
}