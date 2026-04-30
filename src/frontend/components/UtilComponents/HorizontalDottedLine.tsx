
type Props = {
    width: number; // percent
    segmentWidth: number
    numDots?: number;
}

export function HorizontalDottedLine({width,segmentWidth, numDots=50}: Props)
{

    return (
        <div className="flex justify-between items-center"
        style={{width: `${width}%`}}
        >
            {Array.from({length: numDots}).map((_, i) => (
                <div key={i}
                className="h-[0.5px] rounded-full bg-white/50"
                style={{width: `${segmentWidth}px`}}/>
            ))}
        </div>               
    );
}