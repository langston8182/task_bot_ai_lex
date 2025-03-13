import fetch from "node-fetch";

const API_BASE_URL = "https://taskbotai-api.cyrilmarchive.com/tasks";

export const addTask = async (data) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(`Erreur API (${response.status}):`, await response.text());
            return { success: false, message: "Erreur lors de l'ajout de la tâche." };
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error("Erreur lors de l'appel API:", error);
        return { success: false, message: "Erreur technique, veuillez réessayer." };
    }
};
