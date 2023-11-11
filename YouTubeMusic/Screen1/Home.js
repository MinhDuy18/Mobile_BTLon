import * as React from "react";
import {
    FlatList,
    ScrollView,
    View,
    StyleSheet,
    Image,
    Text,
} from "react-native";

function MyComponent(props) {
    return (
        <View style={styles.view1}>
            <View style={styles.view4}>
                <View style={styles.view5}>
                    <Text>Song</Text>
                </View>
                <View style={styles.view6}>
                    <Text>Video</Text>
                </View>
            </View>
            <Image
                resizeMode="contain"
                source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7d6f8d28-b81f-4e38-bdaf-661a937e4795?apiKey=6861cb893c484cb8bc5ad74d90012a87&",
                }}
                style={styles.image3}
            />
            <View style={styles.view7}>
                <Image
                    resizeMode="contain"
                    source={{
                        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/0ca290e9-d368-471e-aee8-5ba4c54838de?apiKey=6861cb893c484cb8bc5ad74d90012a87&",
                    }}
                    style={styles.image4}
                />
                <Image
                    resizeMode="contain"
                    source={{
                        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b1add68b-743a-483a-97c1-827ecf57406d?apiKey=6861cb893c484cb8bc5ad74d90012a87&",
                    }}
                    style={styles.image5}
                />
                <Image
                    resizeMode="contain"
                    source={{
                        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ad6640f4-3b95-4444-8cec-1bef5031d4d5?apiKey=6861cb893c484cb8bc5ad74d90012a87&",
                    }}
                    style={styles.image6}
                />
            </View>
            <View style={styles.view8}>
                <View style={styles.view9}>
                    <Image
                        resizeMode="contain"
                        source={{
                            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/99be1b58-4b65-451b-bd29-2da65737a020?apiKey=6861cb893c484cb8bc5ad74d90012a87&",
                        }}
                        style={styles.image7}
                    />
                    <View style={styles.view10}>
                        <Text>0:35</Text>
                    </View>
                </View>
                <View style={styles.view11}>
                    <Text>3:03</Text>
                </View>
            </View>
            <Image
                resizeMode="contain"
                source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/cece29b6-0cba-4e7b-b8a9-a88cdf25f3a7?apiKey=6861cb893c484cb8bc5ad74d90012a87&",
                }}
                style={styles.image8}
            />
            <View style={styles.view12}>
                <View style={styles.view13}>
                    <View style={styles.view14}>
                        <Text>Up Next</Text>
                    </View>
                    <View style={styles.view16}>
                        <Text>Lyrics</Text>
                    </View>
                    <View style={styles.view17}>
                        <Text>Related</Text>
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        backgroundColor: "#FFF",
        display: "flex",
        width: '100%',
        flexDirection: "column",
    },
    view2: {
        alignSelf: "center",
        display: "flex",
        marginTop: 14,
        width: 364,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
    },
    view3: {
        color: "#1D1B20",
        fontVariantNumeric: "lining-nums proportional-nums",
        fontFeatureSettings: "'dlig' on, 'ss02' on",
        letterSpacing: 0.14,
        alignSelf: "center",
        margin: "auto 0",
        font: "500 14px/143% Roboto, sans-serif ",
    },
    image1: {
        fill: "#1D1B20",
        overflow: "hidden",
        alignSelf: "stretch",
        position: "relative",
        display: "flex",
        width: 24,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
    },
    image2: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        width: 46,
        maxWidth: "100%",
        flexDirection: "column",
        margin: "auto 0",
        aspectRatio: "2.71",
    },
    view4: {
        alignSelf: "center",
        display: "flex",
        marginTop: 34,
        width: 156,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
        flexDirection: 'row',
    },
    view5: {
        color: "#000",
        alignSelf: "stretch",
        whiteSpace: "nowrap",
        borderRadius: 32.5,
        backgroundColor: "rgba(0, 0, 0, 0.07)",
        width: 91,
        maxWidth: "100%",
        padding: "11px 28px 11px 26px",
        font: "500 17px/127% Product Sans Medium, sans-serif ",
    },
    view6: {
        color: "#000",
        alignSelf: "center",
        whiteSpace: "nowrap",
        margin: "auto 0",
        font: "400 17px/127% Product Sans, sans-serif ",
    },
    image3: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        marginTop: 34,
        width: 359,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
    },
    view7: {
        alignSelf: "center",
        display: "flex",
        marginTop: 33,
        width: 360,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
        flexDirection: 'row',
    },
    image4: {
        overflow: "hidden",
        alignSelf: "start",
        position: "relative",
        display: "flex",
        width: 26,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
    },
    image5: {
        overflow: "hidden",
        alignSelf: "start",
        position: "relative",
        display: "flex",
        width: 121,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "2.81",
    },
    image6: {
        overflow: "hidden",
        alignSelf: "start",
        position: "relative",
        display: "flex",
        width: 26,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
    },
    view8: {
        alignSelf: "center",
        display: "flex",
        marginTop: 30,
        width: 358,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
        flexDirection: 'row',
    },
    view9: { alignSelf: "end", display: "flex", flexDirection: "column" },
    image7: {
        overflow: "hidden",
        alignSelf: "stretch",
        position: "relative",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        aspectRatio: "6.29",
    },
    view10: {
        color: "#000",
        alignSelf: "stretch",
        whiteSpace: "nowrap",
        font: "500 13px/127% Product Sans Medium, sans-serif ",
    },
    view11: {
        color: "#000",
        alignSelf: "end",
        marginTop: 20,
        whiteSpace: "nowrap",
        font: "500 13px/127% Product Sans Medium, sans-serif ",
    },
    image8: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        marginTop: 39,
        width: 317,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "4.53",
    },
    view12: {
        borderRadius: "20px 20px 0px 0px",
        background:
            "linear-gradient(180deg, rgba(255, 233, 244, 0.62) 0%, #FFF 100%)",
        alignSelf: "stretch",
        marginTop: 21,
        width: "100%",
        flexGrow: "1",
        flexDirection: "row",
        padding: "16px 43px 10px 41px",
        justifyContent: "space-between",
    },
    view13: {
        alignSelf: "stretch",
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        gap: 20,
        flexDirection: 'row',
    },
    view14: {
        color: "#49454F",
        textAlign: "center",
        marginTop: 24,
        font: "400 18px/89% Product Sans, sans-serif ",

    },
    view15: { alignSelf: "end", display: "flex", flexDirection: "column" },
    image9: {
        strokeWidth: 4,
        stroke: "rgba(0, 0, 0, 0.40)",
        overflow: "hidden",
        alignSelf: "stretch",
        position: "relative",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        aspectRatio: "11",
    },
    view16: {
        color: "#49454F",
        textAlign: "center",
        alignSelf: "stretch",
        marginTop: 20,
        font: "400 18px/89% Product Sans, sans-serif ",
    },
    view17: {
        color: "#49454F",
        textAlign: "center",
        marginTop: 24,
        font: "400 18px/89% Product Sans, sans-serif ",
    },
    image10: {
        strokeWidth: 4,
        stroke: "#000",
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        marginTop: 29,
        width: 110,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "27.5",
    },
});
export default MyComponent;

