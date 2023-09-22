import { colors } from "../style/colors";
import { fonts } from "../style/fonts";
export const styles = {
    container: {
        position: "relative",
        background: colors.white,
        marginTop: "180px",
        color: colors.black,

    },

    model: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "50%",
        height: "auto",
        marginLeft: "25%",
        display: "block",
    },
    bg_img: {
        width: "115%",
        display: "block",
        marginLeft: "-3%",
    },
    under_bg_img: {
        width: "100%",
        height: "auto",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        zIndex: "1000",
        marginTop: "-9%",
    },
    arrow: {
        width: "20px",
        marginRight: "auto",
        marginLeft: "auto",
        display: "block",
        marginTop: "-3%",
        position: "relative",
        zIndex: 1001
    },
    img5: {
        width: "35px",
        marginRight: "auto",
        marginLeft: "auto",
        display: "block",
        marginTop: "7%",
    },
    img6: {
        width: "350px",
        paddingTop: "8%",
        zIndex: "1",
    },
    img7: {
        position: "absolute",
        zIndex: 0,
        marginTop: "8%",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",

},
   /* text: {
        zIndex: 1,
        fontFamily: "Cormorant Garamond",
        fontSize: "24px",
        paddingTop: "2%",
        color: colors.brown,
    },*/
    transitional:{
        ...fonts.transitional,
    },

    heading: {
        ...fonts.heading,
        marginTop: "1%",
    },
    name: {
        fontSize: "38px",
        fontWeight: "normal",
        color: colors.darkGrey,
        fontFamily: "Cormorant Garamond",
        zIndex: 1,
    },

    divider: {
        ...fonts.divider
    },

    divider2: {
        ...fonts.divider,
        marginTop: "11px",
    }
}