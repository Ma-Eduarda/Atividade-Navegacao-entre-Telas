import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export type BooksProps = {
    title: string;
    description: string;
    image: string;
};

export default function Books({ title, description, image }: BooksProps) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#55555513",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 6,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
    },
});
