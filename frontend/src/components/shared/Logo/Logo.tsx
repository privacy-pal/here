import {FC} from "react";

export interface LogoProps {
}

const Logo: FC<LogoProps> = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="29.6" viewBox="0 0 878.16 812.336">
        <g transform="translate(-81.058 -352)">
            <g transform="translate(81.058 352)">
                <path
                    d="M565.241,0A199.252,199.252,0,0,1,737.7,99.462L857.429,306.378a199.252,199.252,0,0,1,0,199.58L737.7,712.874a199.252,199.252,0,0,1-172.463,99.462H325.035a199.252,199.252,0,0,1-172.463-99.462L32.847,505.958a199.252,199.252,0,0,1,0-199.58L152.572,99.462A199.252,199.252,0,0,1,325.035,0Z"
                    transform="translate(-6.058)" fill="#2bbc7f"/>
                <path
                    d="M226.323,450.645c123.89,0,224.323-100.433,224.323-224.323S350.212,2,226.323,2,2,102.433,2,226.323,102.433,450.645,226.323,450.645ZM330.268,190.066a28.038,28.038,0,1,0-39.652-39.652l-92.334,92.34L162.026,206.5a28.038,28.038,0,1,0-39.652,39.652l56.084,56.078a28.04,28.04,0,0,0,39.649,0L330.268,190.066Z"
                    transform="translate(212.758 179.845)" fill="#fff" fillRule="evenodd"/>
            </g>
        </g>
    </svg>;
};

export default Logo;

