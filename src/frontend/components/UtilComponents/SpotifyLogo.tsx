import spotifyLogo from "../../assets/Full_Logo_Green_RGB.svg";
import noTextLogo from "../../assets/Primary_Logo_Green_RGB.svg";
import noTextLogoBlack from "../../assets/Primary_Logo_Black_RGB.svg";

type LogoProps = {
    width: number
}

export function SpotifyLogo({width}: LogoProps){
    return <img src={spotifyLogo}
    alt="Spotify Logo" 
    style={{width: width}}/>
}
export function NoTextSpotifyLogo({width}: LogoProps)
{
    return <img src={noTextLogo}
        alt="Spotify Logo"
        style={{width: width}} />
    
}
export function NoTextBlackSpotifyLogo({width}: LogoProps)
{
        return <img src={noTextLogoBlack}
        alt="Spotify Logo"
        style={{width: width}}
        />
}