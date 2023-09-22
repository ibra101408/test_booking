import {colors} from "./colors";

export const fonts = {
    transitional: {
        zIndex: 1,
        fontFamily: "Cormorant Garamond",
        fontSize: "24px",
        paddingTop: "2%",
        color: colors.brown,
        fontWeight: "normal",
    },
    heading: {
        fontSize: "68px",
        fontFamily: "Cormorant Garamond",
        color: colors.darkGrey,
        fontWeight: "100",
        textAlign: "center",
        marginTop: "0%",
        zIndex: 1,
    },

    text: {
        fontSize: "20px",
        fontFamily: "Cormorant Garamond",
        color: colors.grey,
        textAlign: "center",
        lineHeight: "1.5",
    },

    divider: {
        width: "80px",
        height: "1px",
        background: colors.darkBrown,
        zIndex: 1,
    },
}