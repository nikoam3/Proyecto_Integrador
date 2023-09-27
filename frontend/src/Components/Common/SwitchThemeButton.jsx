import React, { useEffect } from 'react'
import { useTheme } from '../../Context/themeContext'

const SwitchThemeButton = () => {
    const { darkMode, toggleTheme } = useTheme()
    useEffect(() => {}, [darkMode])
    return (
        <button className="switchButton" onClick={toggleTheme}>
            {darkMode ? (
                <FontAwesomeIcon icon={['far', 'moon']} />
            ) : (
                <FontAwesomeIcon icon={['far', 'sun']} />
            )}
        </button>
    )
}

export default SwitchThemeButton
