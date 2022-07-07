import { StyleSheet } from "react-native";


export default  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // marginHorizontal: 16,
    },
    Board: {
        //flex: 1,
        //width: 50,
        alignItems: 'center',
        flexDirection: 'column'
    },
    boardRow: {
        flex: 1,
        flexDirection: "row",
    },

    separator: {
        marginVertical: 18,
        borderBottomColor: "#11f",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    mineCell: {
        width: 40,
        height: 40,
        //flex: 1,
        borderWidth: 1,
        elevation: 0,
        marginLeft: 0,
        marginBottom: -1,
        borderColor: "#faa",
        backgroundColor: "#123",
        aspectRatio: 1,

    },

    gameState: {
        color: '#8aa',
        fontWeight: 'bold',
        fontSize: 20,
    }

});
