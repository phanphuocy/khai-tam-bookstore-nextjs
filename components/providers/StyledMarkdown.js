import styled from "styled-components";
const StyledMarkdown = styled.div`
  padding: ${({ theme: { spacing } }) => `${spacing["3"]} ${spacing["4"]}`};
  p {
    margin-bottom: ${({ theme }) => theme.spacing["2"]};
  }
`;

export default StyledMarkdown;
