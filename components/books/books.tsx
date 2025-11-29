import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface Props {
    title: string;
    description: string;
    image: string;
}

export default function Books({ title, description, image }: Props) {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                contentFit="cover"
            />

            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description} numberOfLines={3}>
                    {description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#f8f8f8ff",
        borderRadius: 10,
        padding: 2,
        marginBottom: 15,
        gap: 10,
        shadowColor: "#000",
        shadowOpacity: 0.10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },

    image: {
        width: 80,
        height: 120,
        borderRadius: 10,
        backgroundColor: "#ddd",
        resizeMode: "cover",
    },

    info: {
        flex: 1,
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 10,
    },

    description: {
        fontSize: 13,
        color: "#666",
        marginTop: 10,
    },
});
