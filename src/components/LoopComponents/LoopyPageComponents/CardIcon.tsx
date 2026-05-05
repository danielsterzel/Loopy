

type Props = {
    element: React.ReactNode
}

export function CardIcon({element} : Props)
{
    return (<div className="w-32 h-32 bg-white rounded-lg p-4 border border-border flex items-center justify-center">
        {element}
    </div>)
}