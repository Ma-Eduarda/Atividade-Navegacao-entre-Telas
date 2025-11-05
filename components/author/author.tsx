import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type AutorProps = {
    nome: string;
    bio: string;
};

export default function Autor({ nome, bio}: AutorProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{nome}</Text>
            <Text style={styles.description}>{bio}</Text>
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
