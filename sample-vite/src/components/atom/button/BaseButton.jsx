import styled from "styled-components";

export const BaseButton = styled.button`
    display: flex;
    justify-content: center;  /* 中央に寄せる */
    align-items: center;      /* 高さをそろえる */
    gap: 8px;                 /* 間のすき間 */

    padding:6px 24px;
    border:none;
    border-radius:100px;
    &:hover {
        cursor:pointer;
        opacity:0.8;
    }
`