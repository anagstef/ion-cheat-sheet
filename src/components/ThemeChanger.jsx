import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { isDarkTheme } from "../stores";

const ThemeChanger = () => {
    const $isDarkTheme = useStore(isDarkTheme);
    useEffect(() => {
        if ($isDarkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [$isDarkTheme]);
};

export default ThemeChanger;