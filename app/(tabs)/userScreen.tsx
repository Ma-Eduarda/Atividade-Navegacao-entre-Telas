import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import Ionicons from '@expo/vector-icons/Ionicons';

import User from "@/components/user/user";
import UserModal from "@/components/modals/userModal";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IUser } from "@/Interfaces/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function UserScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser>();
    const [user, setUser] = useState<IUser[]>([]);
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@users:users");
                const userData = data != null ? JSON.parse(data) : [];
                setUser(userData);
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

    const onAdd = (nome: string, email: string, id?: number) => {

        if (!id || id <= 0) {
            const newUser = {
                id: Math.random() * 1000,
                nome,
                email
            };

            const userPlus: IUser[] = [
                ...user,
                newUser
            ];

            setUser(userPlus);
            AsyncStorage.setItem("@users:users", JSON.stringify(userPlus));

        } else {
            user.forEach(user => {
                if (user.id == id) {
                    user.nome = nome;
                    user.email = email;
                }
            });

            setUser([...user]);
            AsyncStorage.setItem("@users:users", JSON.stringify(user));
        }
        setModalVisible(false);
    };

    const onDelete = (id: number) => {
        const newUser: Array<IUser> = [];

        for (let index = 0; index < user.length; index++) {
            const users = user[index];

            if (users.id != id) {
                newUser.push(users);
            }
        }
        setUser(newUser);
        AsyncStorage.setItem("@users:users", JSON.stringify(newUser));
        setModalVisible(false);
    };

    const openModal = () => {
        setSelectedUser(undefined);
        setModalVisible(true);
    };

    const openEditModal = (selectedUser: IUser) => {
        setSelectedUser(selectedUser)
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

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
                <ThemedText style={styles.title} type="title">Usuários</ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText style={styles.subtitle}>
                    Gerencie sua lista de Usuários.
                </ThemedText>

                <TouchableOpacity onPress={() => setExpanded(!expanded)} >
                    <ThemedText style={styles.locationText} numberOfLines={expanded ? undefined : 1}
                    > 📍 {text} </ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
                <Ionicons name="add" size={25} color="#fff" />
            </TouchableOpacity>

            <View style={styles.listContainer}>
                {user.map((user) => (
                    <TouchableOpacity key={user.id} onPress={() => openEditModal(user)}>
                        <User
                            key={user.id}
                            nome={user.nome}
                            email={user.email}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <UserModal
                visible={modalVisible}
                onAdd={onAdd}
                onCancel={closeModal}
                onDelete={onDelete}
                user={selectedUser}
            />

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
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
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
        borderColor: "#029b3dff",
        borderWidth: 1,
    },
});
