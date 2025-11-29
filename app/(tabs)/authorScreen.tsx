import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import Autor from "@/components/author/author";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IAuthor } from "@/Interfaces/IAuthor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { router } from "expo-router";

export default function AuthorScreen() {
    const [author, setAuthor] = useState<IAuthor[]>([]);
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@authors:authors");
                const authorsData = data != null ? JSON.parse(data) : [];
                setAuthor(authorsData);
            } catch (e) {
                
            }
        }
        getData()
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    const navigateToAuthorDetail = (selectedAuthor: IAuthor) => {
        router.push({ pathname: '/screens/AuthorDetailScreen', params: { authorId: selectedAuthor.id } })
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/livros.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title} >Autores 📝 </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText style={styles.subtitle}>
                    Gerencie sua lista de autores.
                </ThemedText>

                <TouchableOpacity onPress={() => setExpanded(!expanded)} >
                    <ThemedText style={styles.locationText} numberOfLines={expanded ? undefined : 1}
                    > 📍 {text} </ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/screens/AddEditAuthorScreen')}>
                <Ionicons name="add" size={25} color="#fff" />
            </TouchableOpacity>

            <View style={styles.listContainer}>
                {author.map((author) => (
                    <TouchableOpacity  activeOpacity={0.8} key={author.id} onPress={() => navigateToAuthorDetail(author)}>
                        <Autor
                            nome={author.nome}
                            bio={author.bio}
                            image={author.image}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        width: 500,
        height: 300,
        alignSelf: "center",
    },

    titleContainer: {
        marginTop: 10,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },

    subtitle: {
        textAlign: "center",
        color: "#555",
        fontSize: 14,
        marginBottom: 8,
    },

    stepContainer: {
        marginBottom: 5,
    },

    locationText: {
        fontSize: 10,
        color: "#444",
        fontStyle: "italic",
        textAlign: "center",
    },

    listContainer: {
        gap: 12,
        marginBottom: 30,
    },

    addButton: {
        backgroundColor: "#0dbe83ff",
        paddingVertical: 8,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        alignSelf: "center",
        marginBottom: 10,
    },
});
