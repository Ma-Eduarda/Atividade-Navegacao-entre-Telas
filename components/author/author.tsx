import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface Props {
    nome: string;
    bio: string;
    image: string;
}

export default function Author({ nome, bio, image }: Props) {
    return (
        <View style={styles.card}>

            <Image
                source={{ uri: image }}
                style={styles.image}
                contentFit="cover"
            />

            <View style={styles.infoArea}>
                <Text style={styles.title}>{nome}</Text>
                <Text style={styles.bio} numberOfLines={2}>{bio}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#f8f8f8ff",
        borderRadius: 15,
        padding: 10,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOpacity: 0.20,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        gap: 10,
        alignItems: "center",
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: "#ddd",
    },

    infoArea: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },

    bio: {
        fontSize: 14,
        color: "#555",
    },
});
