import { colors } from "../style/colors";
import { fonts } from "../style/fonts";

export const styles = {
    container: {
        background: colors.white,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
    },
    heading: {
        ...fonts.heading,
    },
    transitional: {
        ...fonts.transitional,
    },
    divider: {
        ...fonts.divider,
    },
    text: {
        ...fonts.text,
    }
}