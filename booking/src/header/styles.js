import { colors } from "../style/colors";
import isScrolled from "./index";
export const styles = {
  container: {
    /* background: colors.white,
     color: colors.brown,
     margin: "auto",
     width: "80%",
 */
  },

  header: {
    background: colors.white,
    maxWidth: "100%",
    // paddingTop: "2rem",
    position: "fixed",
    //top: 0,
    zIndex: 1003,


  },
  headerContainer: {
    display: "flex",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  font: {
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "16px",
  },

  hoverFont: {
    background: colors.darkBrown,
    color: colors.black,
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "16px",
  }
}