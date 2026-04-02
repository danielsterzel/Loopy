
type Props = {
    height: number; // percent
    numDots?: number;
}

export function VerticalDottedLine({height, numDots=50} : Props)
{
    return (
        <div className="flex flex-col items-center justify-between ">
            {Array.from({length: numDots}).map((_, i) => (
                <div key={i}
                className="w-[0.5px] h-3 roudned-full bg-white/50"
                />
            ))}
        </div>
    );
}