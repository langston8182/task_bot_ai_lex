import { callApi } from "../services/api_service.mjs";

export const handleAddTask = async (event) => {
    const slots = event.currentIntent.slots;
    const responsable = slots.responsable;
    const dateEcheance = slots.date_echeance;
    const intitule = slots.intitule;

    if (!responsable || !dateEcheance || !intitule) {
        return "Veuillez préciser le responsable, la date et l'intitulé de la tâche.";
    }

    const payload = {
        responsable,
        date_echeance: dateEcheance,
        intitule,
    };

    try {
        const response = await callApi("POST", "/tasks", payload);
        return response.success ? "Tâche ajoutée avec succès !" : "Erreur lors de l'ajout de la tâche.";
    } catch (error) {
        console.error("Erreur ajout tâche:", error);
        return "Erreur technique, veuillez réessayer.";
    }
};
