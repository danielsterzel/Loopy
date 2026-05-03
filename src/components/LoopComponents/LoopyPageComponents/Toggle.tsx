

type Props = {
    enabled: boolean;
    callback: () => void;
}

export function Toggle({enabled, callback} : Props)
{

    return (

        <button
        onClick={callback}
        className={`w-16 h-9 flex items-center rounded-full p-1 transition-all
            duration-300 ${enabled ? "bg-green-500": "bg-gray-300"}`}
        >
            <div className={`bg-white h-7 w-7 rounded-full shadow-md transform 
                transition-all duration-300 
                ${enabled ? "translate-x-7": "translate-x-0"}`} />
        </button>
    
    );
}