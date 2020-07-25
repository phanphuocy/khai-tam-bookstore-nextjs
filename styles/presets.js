const presets = {
  buttons: {
    createNewBtn: `
        ${({ theme }) => theme.borderRadius["rounded"]};
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["5"]}`};
        color: ${({ theme }) => theme.colors.gray["900"]};
        background-color: ${({ theme }) => theme.colors.green["300"]};
        border-top: ${({ theme }) => `1px solid ${theme.colors.green["500"]}`};
        border-bottom: ${({ theme }) =>
          `1px solid ${theme.colors.green["200"]}`};
        ${({ theme }) => theme.shadow.base};

        svg {
        margin-right: ${({ theme }) => theme.spacing["2"]};
        }

        &:hover,
        &:active {
        color: ${({ theme }) => theme.colors.gray["800"]};
        background-color: ${({ theme }) => theme.colors.green["200"]};
        border-top: ${({ theme }) => `1px solid ${theme.colors.green["100"]}`};
        border-bottom: ${({ theme }) =>
          `1px solid ${theme.colors.green["800"]}`};
        ${({ theme }) => theme.shadow.inner};
        }    
    `,
  },
};

export default presets;
