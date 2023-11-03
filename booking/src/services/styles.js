import { colors } from "../style/colors";
import { fonts } from "../style/fonts";

export const styles = {
    container: {
        background: colors.white,
        //backgroundImage: "url(./services-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "130px",
        color: colors.black,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",

    },
    subContainer: {
        backgroundImage: "url(./services-bg.jpg)",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
    },
    transitional:{
        ...fonts.transitional,
    },

    heading: {
        ...fonts.heading,
        margin: 0
    },
    text: {
        ...fonts.text,
        margin: 0,
        width: "530px",
        marginBottom: "0"
    },
    divider: {
        ...fonts.divider,
        marginTop: "3%",
        marginBottom: "3%",
    },
    gridContainer: {
        textAlign: "center",
        paddingLeft: "11%",
        paddingRight: "11%",
        paddingBottom: "4%",
    },
    serviceText: {
        width: "450px",
        ...fonts.text,
        margin: "0 auto 0 auto"
    },
    service_name:{
        color: colors.darkGrey,
        fontFamily: "Poppins",
        fontWeight: 100,
        fontSize: "22px",
        margin: "5% auto 5% auto"
    },
    image: {
        marginTop: "25%",
    }

}
