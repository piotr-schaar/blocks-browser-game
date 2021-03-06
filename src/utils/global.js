import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap&subset=latin-ext');
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: greyscale;
    }
    html {
     font-size: 62.5%;
     box-sizing: border-box;
     --color-main: ${({ theme }) => theme.colors.main};
     --color-mainDark: ${({ theme }) => theme.colors.mainDark} 
     --color-text: ${({ theme }) => theme.colors.textColor};  
     --color-white: ${({ theme }) => theme.colors.whiteColor};
     --color-grey: ${({ theme }) => theme.colors.greyColor};

    }
    body {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        line-height: 1.6;
    }
    a, input, textarea, button {
        outline: none;
        font-family: inherit;
    }
`;
